import { describe, expect, it } from "vitest";
import { photoRenditions } from "@/lib/photo-renditions";
import { isNearbySlide, photoSources } from "@/lib/photos";

describe("Photo delivery", () => {
  it("uses compressed responsive renditions for every existing photo", () => {
    expect(Object.keys(photoRenditions)).toHaveLength(40);
    for (const [original, images] of Object.entries(photoRenditions)) {
      expect(images.length).toBeGreaterThanOrEqual(2);
      expect(photoSources(original).src).toBe(images.at(-1)?.src);
      expect(images.every((image) => image.src.endsWith(".webp"))).toBe(true);
      expect(images.map((image) => image.width)).toEqual([...images.map((image) => image.width)].sort((a, b) => a - b));
      expect(images.at(-1)?.width).toBeLessThanOrEqual(1200);
    }
  });

  it("does not request distant carousel photos until navigation reaches them", () => {
    expect(isNearbySlide(0, 0, 10)).toBe(true);
    expect(isNearbySlide(1, 0, 10)).toBe(true);
    expect(isNearbySlide(9, 0, 10)).toBe(true);
    expect(isNearbySlide(5, 0, 10)).toBe(false);
    expect(isNearbySlide(5, 5, 10)).toBe(true);
  });
});