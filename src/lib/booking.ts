/** Pure booking rules shared by the booking form and the server. */

export const PENDING_HOLD_MINUTES = 20;

/** Parse "YYYY-MM-DD" as a UTC date; null when invalid. */
export function parseDay(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== value ? null : d;
}

export function toDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const a = parseDay(checkIn);
  const b = parseDay(checkOut);
  if (!a || !b) return 0;
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

/** Stays overlap when one starts before the other ends (checkout day is free). */
export function staysOverlap(a: { checkIn: string; checkOut: string }, b: { checkIn: string; checkOut: string }) {
  return a.checkIn < b.checkOut && b.checkIn < a.checkOut;
}

export function quote(pricePerNight: number, nights: number, advancePercent: number) {
  const total = Math.round(pricePerNight * nights * 100) / 100;
  const pct = Math.min(100, Math.max(1, advancePercent));
  const payNow = Math.round(total * pct) / 100;
  return { total, payNow, balance: Math.round((total - payNow) * 100) / 100 };
}

/** Every night (YYYY-MM-DD) occupied by a stay — the checkout day is not included. */
export function nightsOf(checkIn: string, checkOut: string): string[] {
  const out: string[] = [];
  const start = parseDay(checkIn);
  const n = nightsBetween(checkIn, checkOut);
  if (!start) return out;
  for (let i = 0; i < n; i++) out.push(new Date(start.getTime() + i * 86_400_000).toISOString().slice(0, 10));
  return out;
}
