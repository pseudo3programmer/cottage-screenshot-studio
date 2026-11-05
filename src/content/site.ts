/**
 * All editable website content lives here.
 * Leave a field as "" (or an empty array) to hide it on the site.
 * Items marked [PLACEHOLDER] must be replaced with your real details.
 */

import cottageLogo from "@/assets/kaushik-cottage-logo.png.asset.json";
import matheranHero from "@/assets/matheran-hero-monsoon.png.asset.json";
import coupleRoom1 from "@/assets/couple-room-1.png.asset.json";
import coupleRoom2 from "@/assets/couple-room-2.png.asset.json";
import coupleRoom3 from "@/assets/couple-room-3.png.asset.json";
import coupleRoom4 from "@/assets/couple-room-4.png.asset.json";
import coupleRoom5 from "@/assets/couple-room-5.png.asset.json";
import deluxeRoom1 from "@/assets/deluxe-family-room-1.png.asset.json";
import deluxeRoom2 from "@/assets/deluxe-family-room-2.png.asset.json";
import deluxeRoom3 from "@/assets/deluxe-family-room-3.png.asset.json";
import deluxeRoom4 from "@/assets/deluxe-family-room-4.png.asset.json";
import deluxeRoom5 from "@/assets/deluxe-family-room-5.png.asset.json";
import deluxeRoom6 from "@/assets/deluxe-family-room-6.png.asset.json";
import deluxeRoom7 from "@/assets/deluxe-family-room-7.png.asset.json";
import deluxeRoom8 from "@/assets/deluxe-family-room-8.png.asset.json";

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
  name: "Kaushik Cottage",
  logoSrc: cottageLogo.url,
  tagline: "A cottage in Matheran",
  heroImage: matheranHero.url, // Scenic Matheran collage — replace with your own main cottage photo when you have one
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
      name: "Budget Room",
      description: "[PLACEHOLDER] A short description of the Budget Room.",
      images: [],
      facilities: ["Non-AC"],
      occupancy: "",
      beds: "",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 1500 — online booking for this room starts once set
      maxGuests: 2, // [PLACEHOLDER]
    },
    {
      name: "Standard Couple Room",
      description: "[PLACEHOLDER] A short description of the Standard Couple Room.",
      images: [
        { src: coupleRoom1.url, alt: "Standard Couple Room — bed with TV and seating" },
        { src: coupleRoom2.url, alt: "Standard Couple Room — bed, wardrobe and table" },
        { src: coupleRoom3.url, alt: "Standard Couple Room — bed with yellow curtains" },
        { src: coupleRoom4.url, alt: "Standard Couple Room — bed, mirror and TV" },
        { src: coupleRoom5.url, alt: "Standard Couple Room — bed, dresser and table" },
      ], // order here = order shown
      facilities: ["Air-conditioned"],
      occupancy: "",
      beds: "",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 2500 — online booking for this room starts once set
      maxGuests: 2, // [PLACEHOLDER]
    },
    {
      name: "Deluxe Family Room",
      description: "[PLACEHOLDER] A short description of the Deluxe Family Room.",
      images: [
        { src: deluxeRoom1.url, alt: "Deluxe Family Room — two beds with AC and balcony view" },
        { src: deluxeRoom2.url, alt: "Deluxe Family Room — beds, TV and attached washroom" },
        { src: deluxeRoom3.url, alt: "Deluxe Family Room — beds with balcony and valley view" },
        { src: deluxeRoom4.url, alt: "Deluxe Family Room — beds, AC and TV" },
        { src: deluxeRoom5.url, alt: "Deluxe Family Room — three beds with seating chairs" },
        { src: deluxeRoom6.url, alt: "Deluxe Family Room — three beds with table and chairs" },
        { src: deluxeRoom7.url, alt: "Deluxe Family Room — three beds, TV and mirror" },
        { src: deluxeRoom8.url, alt: "Deluxe Family Room — three beds opening to the balcony" },
      ], // order here = order shown
      facilities: ["Air-conditioned"],
      occupancy: "",
      beds: "",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 3500 — online booking for this room starts once set
      maxGuests: 4, // [PLACEHOLDER]
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
