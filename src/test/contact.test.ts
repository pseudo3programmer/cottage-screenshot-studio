import { describe, expect, it } from "vitest";
import { roomDetails, whatsappLink } from "@/lib/contact";

describe("whatsappLink", () => {
  it("builds wa.me link with digits only and encoded message", () => {
    expect(whatsappLink("+91 98765-43210", "Hi there!")).toBe("https://wa.me/919876543210?text=Hi%20there!");
  });
  it("returns null when no number is configured", () => {
    expect(whatsappLink("", "Hi")).toBeNull();
  });
});

describe("roomDetails", () => {
  it("hides empty occupancy, beds and price", () => {
    expect(roomDetails({ occupancy: "", beds: " ", price: "₹3000" })).toEqual([{ label: "Price", value: "₹3000" }]);
  });
});
