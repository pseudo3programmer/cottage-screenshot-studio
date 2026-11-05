/** Cashfree Payment Gateway (PG v2023-08-01). Server-only: keys never reach the browser. */

export function cashfreeConfig() {
  const appId = process.env["CASHFREE_APP_ID"];
  const secret = process.env["CASHFREE_SECRET_KEY"];
  const mode = process.env["CASHFREE_ENV"] === "production" ? "production" : "sandbox";
  if (!appId || !secret) return null;
  const base = mode === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg";
  return { appId, secret, mode, base } as const;
}

type Cfg = NonNullable<ReturnType<typeof cashfreeConfig>>;

function headers(cfg: Cfg) {
  return {
    "content-type": "application/json",
    "x-api-version": "2023-08-01",
    "x-client-id": cfg.appId,
    "x-client-secret": cfg.secret,
  };
}

export async function createCashfreeOrder(
  cfg: Cfg,
  o: { orderId: string; amount: number; name: string; phone: string; email: string; returnUrl: string; note: string },
) {
  const res = await fetch(`${cfg.base}/orders`, {
    method: "POST",
    headers: headers(cfg),
    body: JSON.stringify({
      order_id: o.orderId,
      order_amount: o.amount,
      order_currency: "INR",
      order_note: o.note.slice(0, 200),
      customer_details: {
        customer_id: o.phone.replace(/\D/g, "") || o.orderId,
        customer_name: o.name,
        customer_phone: o.phone.replace(/\D/g, "").slice(-10),
        customer_email: o.email,
      },
      order_meta: { return_url: o.returnUrl },
    }),
  });
  const body = (await res.json().catch(() => ({}))) as { payment_session_id?: string; message?: string };
  if (!res.ok || !body.payment_session_id) {
    console.error("Cashfree create order failed", res.status, body.message);
    throw new Error("Payment could not be started. Please try again.");
  }
  return body.payment_session_id;
}

export async function getCashfreeOrderStatus(cfg: Cfg, orderId: string) {
  const res = await fetch(`${cfg.base}/orders/${encodeURIComponent(orderId)}`, { headers: headers(cfg) });
  if (!res.ok) return null;
  const body = (await res.json()) as { order_status?: string; order_amount?: number };
  return body;
}
