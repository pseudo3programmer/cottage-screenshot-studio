import { describe, expect, it } from "vitest";
import { site } from "@/content/site";
import { instagramLink, phoneLink, roomDetails, whatsappLink } from "@/lib/contact";

describe("whatsappLink", () => {
  it("builds wa.me link with digits only and encoded message", () => {
    expect(whatsappLink("+91 98765-43210", "Hi there!")).toBe("https://wa.me/919876543210?text=Hi%20there!");
  });
  it("returns null when no number is configured", () => {
    expect(whatsappLink("", "Hi")).toBeNull();
  });
});

describe("phoneLink", () => {
  it("builds a tel: link keeping the country code and dropping spaces", () => {
    expect(phoneLink("+91 98765 43210")).toBe("tel:+919876543210");
  });
  it("returns null when the number is empty or too short to dial", () => {
    expect(phoneLink("")).toBeNull();
    expect(phoneLink("12345")).toBeNull();
  });
});

describe("instagramLink", () => {
  it("keeps a full profile URL as typed", () => {
    expect(instagramLink("https://instagram.com/yourcottage")).toBe("https://instagram.com/yourcottage");
  });
  it("turns a handle into a profile URL, with or without the @", () => {
    expect(instagramLink("@yourcottage")).toBe("https://www.instagram.com/yourcottage");
    expect(instagramLink("yourcottage/")).toBe("https://www.instagram.com/yourcottage");
  });
  it("returns null when no profile is configured", () => {
    expect(instagramLink("")).toBeNull();
    expect(instagramLink("   ")).toBeNull();
    expect(instagramLink("@")).toBeNull();
  });
});

describe("roomDetails", () => {
  it("hides empty occupancy, beds and price", () => {
    expect(roomDetails({ occupancy: "", beds: " ", price: "₹3000" })).toEqual([{ label: "Price", value: "₹3000" }]);
  });
});

describe("configured contacts", () => {
  it("points Instagram at the cottage's own profile", () => {
    expect(instagramLink(site.contact.instagram)).toBe("https://www.instagram.com/kaushik_cottege");
  });
  it("sends WhatsApp and calls to the cottage's number", () => {
    expect(whatsappLink(site.contact.whatsapp, "Hi")?.startsWith("https://wa.me/918806432531?text=")).toBe(true);
    expect(phoneLink(site.contact.phone)).toBe("tel:+918806432531");
  });
});
