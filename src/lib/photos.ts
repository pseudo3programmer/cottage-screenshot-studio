import { photoRenditions } from "@/lib/photo-renditions";

export function photoSources(src: string) {
  const renditions = photoRenditions[src];
  const largest = renditions?.at(-1);
  return {
    src: largest?.src ?? src,
    srcSet: renditions?.map((image) => `${image.src} ${image.width}w`).join(", "),
    width: largest?.width,
    height: largest?.height,
  };
}

export function isNearbySlide(index: number, selected: number, count: number) {
  const distance = Math.abs(index - selected);
  return distance <= 1 || distance === count - 1;
}