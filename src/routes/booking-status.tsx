import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { confirmBooking } from "@/lib/booking.functions";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/booking-status")({
  validateSearch: (s: Record<string, unknown>) => ({ order_id: typeof s.order_id === "string" ? s.order_id : "" }),
  head: () => ({
    meta: [
      { title: `Booking status — ${site.name}` },
      { name: "description", content: `Your booking confirmation at ${site.name}, Matheran.` },
      { property: "og:title", content: `Booking status — ${site.name}` },
      { property: "og:description", content: `Your booking confirmation at ${site.name}, Matheran.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingStatus,
});

type Result = Awaited<ReturnType<typeof confirmBooking>>;

function BookingStatus() {
  const { order_id } = Route.useSearch();
  const confirm = useServerFn(confirmBooking);
  const [res, setRes] = useState<Result | null>(null);

  useEffect(() => {
    if (!order_id) return setRes({ status: "not_found" });
    confirm({ data: { orderId: order_id } }).then(setRes).catch(() => setRes({ status: "not_found" }));
  }, [order_id, confirm]);

  const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-16">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-soft">
        {!res ? (
          <><Clock className="mx-auto h-12 w-12 animate-pulse text-primary" /><p className="mt-4">Checking your payment…</p></>
        ) : res.status === "paid" ? (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-whatsapp" />
            <h1 className="mt-4 text-3xl font-semibold">Booking confirmed!</h1>
            <p className="mt-2 text-muted-foreground">Thank you, {res.name}. See you in Matheran.</p>
            <dl className="mt-6 space-y-2 rounded-xl bg-secondary/60 p-4 text-left text-sm">
              <div className="flex justify-between"><dt>Room</dt><dd className="font-medium">{res.roomName}</dd></div>
              <div className="flex justify-between"><dt>Dates</dt><dd className="font-medium">{res.checkIn} → {res.checkOut}</dd></div>
              <div className="flex justify-between"><dt>Guests</dt><dd className="font-medium">{res.guests}</dd></div>
              <div className="flex justify-between"><dt>Paid</dt><dd className="font-medium">{inr(res.amount)}</dd></div>
              {res.total > res.amount && <div className="flex justify-between"><dt>Due at cottage</dt><dd className="font-medium">{inr(res.total - res.amount)}</dd></div>}
              <div className="flex justify-between text-muted-foreground"><dt>Booking ID</dt><dd>{res.orderId}</dd></div>
            </dl>
          </>
        ) : res.status === "pending" ? (
          <><Clock className="mx-auto h-12 w-12 text-accent" /><h1 className="mt-4 text-2xl font-semibold">Payment not completed yet</h1><p className="mt-2 text-muted-foreground">If money was deducted, it will confirm shortly. Refresh this page in a minute.</p></>
        ) : (
          <><XCircle className="mx-auto h-12 w-12 text-destructive" /><h1 className="mt-4 text-2xl font-semibold">Booking not completed</h1><p className="mt-2 text-muted-foreground">The payment didn't go through. Your dates were not reserved — please try again.</p></>
        )}
        <Button asChild className="mt-6 rounded-full"><Link to="/">Back to the cottage</Link></Button>
      </div>
    </main>
  );
}
