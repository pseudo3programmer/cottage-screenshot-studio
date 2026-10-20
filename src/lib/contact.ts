export function whatsappLink(number: string, message: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** tel: link, or null when no usable number is configured. */
export function phoneLink(phone: string): string | null {
  const cleaned = phone.replace(/[^\d+]/g, "");
  if (cleaned.replace(/\D/g, "").length < 7) return null;
  return `tel:${cleaned}`;
}

/** Instagram profile URL. Accepts a full URL, "@handle" or a bare "handle". */
export function instagramLink(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) return v;
  const handle = v.replace(/^@/, "").replace(/\/+$/, "");
  if (!handle) return null;
  return `https://www.instagram.com/${handle}`;
}

export function roomDetails(room: { occupancy?: string; beds?: string; price?: string }) {
  return [
    { label: "Occupancy", value: room.occupancy },
    { label: "Beds", value: room.beds },
    { label: "Price", value: room.price },
  ].filter((d): d is { label: string; value: string } => !!d.value && d.value.trim() !== "");
}
