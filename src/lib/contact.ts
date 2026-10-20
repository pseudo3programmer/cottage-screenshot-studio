export function whatsappLink(number: string, message: string): string | null {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function roomDetails(room: { occupancy?: string; beds?: string; price?: string }) {
  return [
    { label: "Occupancy", value: room.occupancy },
    { label: "Beds", value: room.beds },
    { label: "Price", value: room.price },
  ].filter((d): d is { label: string; value: string } => !!d.value && d.value.trim() !== "");
}
