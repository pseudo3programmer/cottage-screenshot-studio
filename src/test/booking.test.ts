import { describe, expect, it } from "vitest";
import { nightsBetween, nightsOf, quote, staysOverlap } from "@/lib/booking";

describe("booking rules", () => {
  it("counts nights between dates", () => {
    expect(nightsBetween("2026-12-01", "2026-12-04")).toBe(3);
    expect(nightsBetween("2026-12-04", "2026-12-01")).toBe(-3);
  });

  it("lets a new guest check in on another guest's checkout day", () => {
    expect(staysOverlap({ checkIn: "2026-12-01", checkOut: "2026-12-03" }, { checkIn: "2026-12-03", checkOut: "2026-12-05" })).toBe(false);
  });

  it("blocks overlapping stays", () => {
    expect(staysOverlap({ checkIn: "2026-12-01", checkOut: "2026-12-04" }, { checkIn: "2026-12-03", checkOut: "2026-12-05" })).toBe(true);
  });

  it("charges price x nights, with an optional advance", () => {
    expect(quote(3000, 2, 100)).toEqual({ total: 6000, payNow: 6000, balance: 0 });
    expect(quote(3000, 2, 30)).toEqual({ total: 6000, payNow: 1800, balance: 4200 });
  });

  it("lists booked nights excluding checkout day", () => {
    expect(nightsOf("2026-12-30", "2027-01-01")).toEqual(["2026-12-30", "2026-12-31"]);
  });
});
