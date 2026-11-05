import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { site } from "@/content/site";
import { PENDING_HOLD_MINUTES, nightsBetween, nightsOf, parseDay, quote, staysOverlap } from "@/lib/booking";

const holdCutoff = () => new Date(Date.now() - PENDING_HOLD_MINUTES * 60_000).toISOString();

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Booked nights per room (only dates, no guest details). */
export const getBookedNights = createServerFn({ method: "GET" })
  .inputValidator((d: { roomIndex: number }) => z.object({ roomIndex: z.number().int().min(0) }).parse(d))
  .handler(async ({ data }) => {
    const db = await admin();
    const today = new Date().toISOString().slice(0, 10);
    const { data: rows, error } = await db
      .from("bookings")
      .select("check_in, check_out, status, created_at")
      .eq("room_index", data.roomIndex)
      .gte("check_out", today)
      .in("status", ["paid", "pending"]);
    if (error) {
      console.error(error);
      return { nights: [] as string[] };
    }
    const cutoff = holdCutoff();
    const nights = (rows ?? [])
      .filter((r) => r.status === "paid" || r.created_at > cutoff)
      .flatMap((r) => nightsOf(r.check_in, r.check_out));
    return { nights: [...new Set(nights)] };
  });

async function isFree(roomIndex: number, checkIn: string, checkOut: string, ignoreOrder?: string) {
  const db = await admin();
  const { data: rows, error } = await db
    .from("bookings")
    .select("order_id, check_in, check_out, status, created_at")
    .eq("room_index", roomIndex)
    .lt("check_in", checkOut)
    .gt("check_out", checkIn)
    .in("status", ["paid", "pending"]);
  if (error) throw new Error("Could not check availability.");
  const cutoff = holdCutoff();
  return !(rows ?? []).some(
    (r) => r.order_id !== ignoreOrder && (r.status === "paid" || r.created_at > cutoff) && staysOverlap({ checkIn, checkOut }, { checkIn: r.check_in, checkOut: r.check_out }),
  );
}

const startSchema = z.object({
  roomIndex: z.number().int().min(0),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.number().int().min(1).max(30),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{10,16}$/, "Enter a valid phone number"),
  email: z.string().trim().email().max(200),
});

export const startBooking = createServerFn({ method: "POST" })
  .inputValidator((d: z.infer<typeof startSchema>) => startSchema.parse(d))
  .handler(async ({ data }) => {
    const { cashfreeConfig, createCashfreeOrder } = await import("@/lib/cashfree.server");
    const cfg = cashfreeConfig();
    if (!cfg) return { ok: false as const, error: "Online payment isn't set up yet. Please book on WhatsApp." };

    const room = site.rooms[data.roomIndex];
    const price = room?.pricePerNight ?? 0;
    if (!room || price <= 0) return { ok: false as const, error: "This room can't be booked online yet." };
    if (room.maxGuests && data.guests > room.maxGuests) return { ok: false as const, error: `This room fits up to ${room.maxGuests} guests.` };

    const today = new Date().toISOString().slice(0, 10);
    const nights = nightsBetween(data.checkIn, data.checkOut);
    if (!parseDay(data.checkIn) || !parseDay(data.checkOut) || data.checkIn < today || nights < 1 || nights > 30) {
      return { ok: false as const, error: "Please choose valid dates." };
    }
    if (!(await isFree(data.roomIndex, data.checkIn, data.checkOut))) {
      return { ok: false as const, error: "Sorry, those dates were just booked. Please pick other dates." };
    }

    const q = quote(price, nights, site.booking.advancePercent);
    const orderId = `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const db = await admin();
    const { error } = await db.from("bookings").insert({
      order_id: orderId,
      room_index: data.roomIndex,
      room_name: room.name,
      check_in: data.checkIn,
      check_out: data.checkOut,
      nights,
      guests: data.guests,
      guest_name: data.name,
      guest_phone: data.phone,
      guest_email: data.email,
      amount: q.payNow,
      total: q.total,
    });
    if (error) {
      console.error(error);
      return { ok: false as const, error: "Could not save your booking. Please try again." };
    }

    const origin = new URL(getRequest().url).origin;
    try {
      const sessionId = await createCashfreeOrder(cfg, {
        orderId,
        amount: q.payNow,
        name: data.name,
        phone: data.phone,
        email: data.email,
        returnUrl: `${origin}/booking-status?order_id=${orderId}`,
        note: `${room.name}: ${data.checkIn} to ${data.checkOut}`,
      });
      return { ok: true as const, sessionId, mode: cfg.mode };
    } catch (e) {
      await db.from("bookings").update({ status: "failed" }).eq("order_id", orderId);
      return { ok: false as const, error: (e as Error).message };
    }
  });

/** Confirms the payment with Cashfree (never trusts the browser) and returns booking details. */
export const confirmBooking = createServerFn({ method: "POST" })
  .inputValidator((d: { orderId: string }) => z.object({ orderId: z.string().regex(/^bk_[\w]+$/) }).parse(d))
  .handler(async ({ data }) => {
    const { cashfreeConfig, getCashfreeOrderStatus } = await import("@/lib/cashfree.server");
    const db = await admin();
    const { data: b } = await db.from("bookings").select("*").eq("order_id", data.orderId).maybeSingle();
    if (!b) return { status: "not_found" as const };

    let status = b.status;
    const cfg = cashfreeConfig();
    if (status === "pending" && cfg) {
      const cf = await getCashfreeOrderStatus(cfg, data.orderId);
      if (cf?.order_status === "PAID" && Number(cf.order_amount) === Number(b.amount)) {
        status = "paid";
        await db.from("bookings").update({ status, paid_at: new Date().toISOString() }).eq("order_id", data.orderId);
      } else if (cf?.order_status === "EXPIRED" || cf?.order_status === "TERMINATED") {
        status = "failed";
        await db.from("bookings").update({ status }).eq("order_id", data.orderId);
      }
    }
    return {
      status: status as "paid" | "pending" | "failed" | "cancelled",
      roomName: b.room_name,
      checkIn: b.check_in,
      checkOut: b.check_out,
      nights: b.nights,
      guests: b.guests,
      name: b.guest_name,
      amount: Number(b.amount),
      total: Number(b.total),
      orderId: b.order_id,
    };
  });
