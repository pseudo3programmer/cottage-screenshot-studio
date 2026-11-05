import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/content/site";
import { getBookedNights, startBooking } from "@/lib/booking.functions";
import { nightsBetween, nightsOf, quote, toDay } from "@/lib/booking";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

declare global {
  interface Window {
    Cashfree?: (o: { mode: string }) => { checkout: (o: { paymentSessionId: string; redirectTarget: string }) => Promise<unknown> };
  }
}

function loadCashfree(): Promise<void> {
  if (window.Cashfree) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load payment page"));
    document.head.appendChild(s);
  });
}

export function Booking() {
  const bookable = site.rooms.map((r, i) => ({ r, i })).filter(({ r }) => (r.pricePerNight ?? 0) > 0);
  const [roomIndex, setRoomIndex] = useState(bookable[0]?.i ?? -1);
  const [range, setRange] = useState<DateRange | undefined>();
  const [booked, setBooked] = useState<Set<string>>(new Set());
  const [guests, setGuests] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [busy, setBusy] = useState(false);
  const fetchBooked = useServerFn(getBookedNights);
  const start = useServerFn(startBooking);

  useEffect(() => {
    if (roomIndex < 0) return;
    setRange(undefined);
    fetchBooked({ data: { roomIndex } }).then((r) => setBooked(new Set(r.nights))).catch(() => setBooked(new Set()));
  }, [roomIndex, fetchBooked]);

  const room = site.rooms[roomIndex];
  const checkIn = range?.from ? toDay(range.from) : "";
  const checkOut = range?.to ? toDay(range.to) : "";
  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const clash = nights > 0 && nightsOf(checkIn, checkOut).some((n) => booked.has(n));
  const q = useMemo(() => (room && nights > 0 ? quote(room.pricePerNight ?? 0, nights, site.booking.advancePercent) : null), [room, nights]);

  if (bookable.length === 0) {
    return (
      <div className="rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center text-muted-foreground">
        Online booking opens once room prices are added. Until then, please book on WhatsApp.
      </div>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    if (!room || nights < 1 || clash) return;
    setBusy(true);
    try {
      const res = await start({ data: { roomIndex, checkIn, checkOut, guests, ...form } });
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      await loadCashfree();
      await window.Cashfree!({ mode: res.mode }).checkout({ paymentSessionId: res.sessionId, redirectTarget: "_self" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={pay} className="grid gap-8 rounded-2xl bg-card p-5 shadow-soft md:grid-cols-2 md:p-8">
      <div>
        {bookable.length > 1 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {bookable.map(({ r, i }) => (
              <Button key={i} type="button" variant={i === roomIndex ? "default" : "outline"} className="rounded-full" onClick={() => setRoomIndex(i)}>
                {r.name}
              </Button>
            ))}
          </div>
        )}
        <p className="mb-2 text-sm text-muted-foreground">Pick check-in, then check-out. Greyed-out nights are taken.</p>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={1}
          disabled={[{ before: today }, (d: Date) => booked.has(toDay(d))]}
          className="pointer-events-auto rounded-xl border p-3"
        />
        {(site.booking.checkInTime || site.booking.checkOutTime) && (
          <p className="mt-3 text-sm text-muted-foreground">
            {site.booking.checkInTime && `Check-in ${site.booking.checkInTime}`}
            {site.booking.checkInTime && site.booking.checkOutTime && " · "}
            {site.booking.checkOutTime && `Check-out ${site.booking.checkOutTime}`}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-xl bg-secondary/60 p-4">
          <p className="font-display text-xl">{room?.name}</p>
          {range?.from && range.to ? (
            <p className="text-sm text-muted-foreground">
              {format(range.from, "d MMM")} – {format(range.to, "d MMM yyyy")} · {nights} night{nights > 1 ? "s" : ""}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Choose your dates</p>
          )}
          {clash && <p className="mt-2 text-sm text-destructive">Some of these nights are taken — please choose other dates.</p>}
          {q && !clash && (
            <dl className="mt-3 space-y-1 text-sm">
              <div className="flex justify-between"><dt>{inr(room!.pricePerNight!)} × {nights} nights</dt><dd className="font-medium">{inr(q.total)}</dd></div>
              {q.balance > 0 && <div className="flex justify-between text-muted-foreground"><dt>Pay at the cottage</dt><dd>{inr(q.balance)}</dd></div>}
              <div className="flex justify-between border-t pt-2 text-base font-semibold"><dt>Pay now</dt><dd>{inr(q.payNow)}</dd></div>
            </dl>
          )}
        </div>

        <div className="grid gap-3">
          <div><Label htmlFor="bk-name">Full name</Label><Input id="bk-name" required minLength={2} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
          <div><Label htmlFor="bk-phone">Phone (WhatsApp)</Label><Input id="bk-phone" type="tel" required pattern="[+\d\s\-]{10,16}" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div><Label htmlFor="bk-email">Email</Label><Input id="bk-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><Label htmlFor="bk-guests">Guests</Label><Input id="bk-guests" type="number" min={1} max={room?.maxGuests || 30} value={guests} onChange={(e) => setGuests(Math.max(1, Number(e.target.value) || 1))} /></div>
        </div>

        {site.booking.cancellationPolicy && <p className="text-xs text-muted-foreground">{site.booking.cancellationPolicy}</p>}

        <Button type="submit" size="lg" className="h-12 rounded-full" disabled={busy || !q || clash}>
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
          {q && !clash ? `Pay ${inr(q.payNow)} & Book` : "Select dates to book"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">Secure payment by Cashfree — UPI, cards & net banking</p>
      </div>
    </form>
  );
}
