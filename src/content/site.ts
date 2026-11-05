/**
 * All editable website content lives here.
 * Leave a field as "" (or an empty array) to hide it on the site.
 * Items marked [PLACEHOLDER] must be replaced with your real details.
 */

export type RoomImage = { src: string; alt: string };

export type Room = {
  name: string;
  description: string;
  images: RoomImage[]; // order here = order shown
  facilities: string[];
  occupancy?: string;
  beds?: string;
  price?: string;
  /** Rupees per night used for online booking. Leave 0 to turn online booking off for this room. */
  pricePerNight?: number;
  maxGuests?: number;
};

export type ManualReview = {
  author: string;
  rating: number; // 1-5
  text: string;
  date?: string;
};

export const site = {
  name: "Your Cottage Name", // [PLACEHOLDER]
  logoSrc: "", // [PLACEHOLDER] logo image URL; empty shows a text mark
  tagline: "A cottage in Matheran",
  heroImage: "", // [PLACEHOLDER] main cottage photo
  heroHeadline: "Your Peaceful Getaway in Matheran",
  heroText:
    "Wake up to mist over the hills, birdsong in the trees and slow days in Maharashtra's car-free hill station.",
  about: [
    "[PLACEHOLDER] Tell guests about your cottage — its story, its atmosphere and what makes a stay here feel special.",
    "[PLACEHOLDER] Describe your hospitality, home-cooked food (if offered) and the experience of staying in Matheran.",
  ],
  highlights: [
    { title: "Natural surroundings", text: "[PLACEHOLDER] Describe the trees, views and quiet around the cottage." },
    { title: "Comfort & amenities", text: "[PLACEHOLDER] List the comforts you actually offer." },
    { title: "Nearby attractions", text: "[PLACEHOLDER] Name the viewpoints or spots close by." },
    { title: "Who it suits", text: "[PLACEHOLDER] Families, couples or groups — only what you confirm." },
  ],

  contact: {
    whatsapp: "", // [PLACEHOLDER] international format, digits only, e.g. 919876543210
    phone: "", // [PLACEHOLDER] e.g. +91 98765 43210 — shown as a "Call" button once added
    email: "", // optional
    instagram: "", // [PLACEHOLDER] e.g. https://instagram.com/yourcottage, or just @yourcottage

    whatsappMessage:
      "Hello! I am interested in staying at your cottage in Matheran. Could you please share the room availability and details?",
  },

  location: {
    address: "", // [PLACEHOLDER] full address
    mapsUrl: "", // [PLACEHOLDER] Google Maps listing link
    embedQuery: "", // [PLACEHOLDER] exact cottage name + address used to centre the map
    writeReviewUrl: "", // [PLACEHOLDER] Google "write a review" link
  },

  rooms: [
    {
      name: "Room name", // [PLACEHOLDER]
      description: "[PLACEHOLDER] A short description of this room.",
      images: [],
      facilities: [],
      occupancy: "",
      beds: "",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 3500 — online booking for this room starts once set
      maxGuests: 2, // [PLACEHOLDER]
    },
  ] as Room[],

  booking: {
    /** % of the total paid online when booking (100 = full payment, 30 = 30% advance). */
    advancePercent: 100, // [PLACEHOLDER]
    checkInTime: "", // [PLACEHOLDER] e.g. 12:00 PM
    checkOutTime: "", // [PLACEHOLDER] e.g. 10:00 AM
    cancellationPolicy: "", // [PLACEHOLDER] shown before payment once added
  },

  // Approved reviews copied manually. These are NOT synced automatically with Google.
  manualReviews: [] as ManualReview[],
};
