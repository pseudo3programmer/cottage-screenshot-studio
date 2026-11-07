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
import standardCoupleRoom1 from "@/assets/standard-couple-room-1.jpg.asset.json";
import standardCoupleRoom2 from "@/assets/standard-couple-room-2.jpg.asset.json";
import standardCoupleRoom3 from "@/assets/standard-couple-room-3.jpg.asset.json";
import standardCoupleRoom4 from "@/assets/standard-couple-room-4.jpg.asset.json";
import standardCoupleRoom5 from "@/assets/standard-couple-room-5.jpg.asset.json";
import standardCoupleRoom6 from "@/assets/standard-couple-room-6.jpg.asset.json";
import budgetRoom6 from "@/assets/budget-room-6.jpg.asset.json";
import budgetRoom7 from "@/assets/budget-room-7.jpg.asset.json";
import budgetRoom8 from "@/assets/budget-room-8.jpg.asset.json";
import budgetRoom9 from "@/assets/budget-room-9.jpg.asset.json";
import deluxeRoom1 from "@/assets/deluxe-family-room-1.png.asset.json";
import deluxeRoom2 from "@/assets/deluxe-family-room-2.png.asset.json";
import deluxeRoom3 from "@/assets/deluxe-family-room-3.png.asset.json";
import deluxeRoom4 from "@/assets/deluxe-family-room-4.png.asset.json";
import deluxeRoom5 from "@/assets/deluxe-family-room-5.png.asset.json";
import deluxeRoom6 from "@/assets/deluxe-family-room-6.png.asset.json";
import deluxeRoom7 from "@/assets/deluxe-family-room-7.png.asset.json";
import deluxeRoom8 from "@/assets/deluxe-family-room-8.png.asset.json";

export type RoomImage = { src: string; alt: string; label?: string };

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
    "Tucked near Aman Lodge in the quiet green stretches of Matheran, Kaushik Cottage is a peaceful hill-station retreat away from the crowds — tall trees, cool mountain air and Asia's only automobile-free hill station all around you.",
    "Expect warm local hospitality, clean and comfortable rooms, and friendly help planning your walks to Matheran's viewpoints, lakes and heritage spots.",
  ],
  highlights: [
    { title: "Natural surroundings", text: "Leafy forest all around, birdsong in the mornings and Matheran's red-earth trails right outside the door." },
    { title: "Comfort & amenities", text: "Clean rooms with AC and non-AC options, attached washrooms, fresh linen and TV in the AC rooms." },
    { title: "Nearby attractions", text: "Close to Aman Lodge station, with easy access to Charlotte Lake, Louisa Point and the heritage toy train." },
    { title: "Who it suits", text: "Couples looking for a quiet weekend and families wanting roomy, relaxed stays." },
  ],

  contact: {
    whatsapp: "918806432531",
    phone: "+91 88064 32531",
    email: "", // optional
    instagram: "https://www.instagram.com/kaushik_cottege",

    whatsappMessage:
      "Hello! I am interested in staying at your cottage in Matheran. Could you please share the room availability and details?",
  },

  location: {
    address: "Aman Lodge, Indira Gandhi Nagar, Matheran, Maharashtra 410102, India",
    mapsUrl: "https://maps.app.goo.gl/b6gDtkt2EH7nmiWG6",
    embedQuery: "Kaushik Cottage Matheran, Aman Lodge, Indira Gandhi Nagar, Matheran 410102",
    /** Google listing ID — used to load live Google reviews. */
    googlePlaceId: "ChIJn28RRhPv5zsRtLOLZbfe8Pw",
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJn28RRhPv5zsRtLOLZbfe8Pw",
  },

  rooms: [
    {
      name: "Budget Room",
      description: "A simple, pocket-friendly room with a comfortable bed, ceiling fan and attached washroom — ideal for light travellers.",
      images: [
        { src: coupleRoom1.url, alt: "Budget Room — bed with TV and seating" },
        { src: coupleRoom3.url, alt: "Budget Room — bed with yellow curtains" },
        { src: coupleRoom5.url, alt: "Budget Room — bed, dresser and table" },
        { src: budgetRoom6.url, alt: "Budget Room — bed, TV and cane chair" },
        { src: budgetRoom8.url, alt: "Budget Room — floral bed, wardrobe and mirror" },
        { src: budgetRoom9.url, alt: "Budget Room — teal bed with chairs and table" },
        { src: budgetRoom7.url, alt: "Budget Room — attached washroom" },
      ],
      facilities: ["Non-AC"],
      occupancy: "Up to 2 guests",
      beds: "1 double bed",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 1500 — online booking for this room starts once set
      maxGuests: 2,
    },
    {
      name: "Standard Couple Room",
      description: "A cosy air-conditioned room with a double bed, wall TV, wooden wardrobe, seating chairs and attached washroom.",
      images: [
        { src: coupleRoom4.url, alt: "Standard Couple Room — bed, mirror and TV" },
        { src: coupleRoom2.url, alt: "Standard Couple Room — bed, wardrobe and table" },
        { src: standardCoupleRoom1.url, alt: "Standard Couple Room — bed with sunflower bedspread, wardrobe and mirror" },
        { src: standardCoupleRoom3.url, alt: "Standard Couple Room — bed with two windows and air conditioning" },
        { src: standardCoupleRoom4.url, alt: "Standard Couple Room — bed with teal bedspread and window" },
        { src: standardCoupleRoom5.url, alt: "Standard Couple Room — bed with blue floral bedspread and window" },
        { src: standardCoupleRoom2.url, alt: "Standard Couple Room — pink room with balcony door and hill view" },
        { src: standardCoupleRoom6.url, alt: "Standard Couple Room — attached washroom with fish-pattern tiles" },
      ],
      facilities: ["Air-conditioned"],
      occupancy: "Up to 2 guests",
      beds: "1 double bed",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 2500 — online booking for this room starts once set
      maxGuests: 2,
    },
    {
      name: "Deluxe Family Room",
      description: "A spacious air-conditioned room with two or three beds, TV, seating and balcony doors opening to green valley views.",
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
      occupancy: "Up to 4–5 guests",
      beds: "2–3 beds",
      price: "",
      pricePerNight: 0, // [PLACEHOLDER] e.g. 3500 — online booking for this room starts once set
      maxGuests: 5,
    },
  ] as Room[],

  // Cottage kitchen menu — item names only (prices are shared on request).
  menu: [
    {
      title: "Breakfast",
      timing: "8:30 – 10:30 AM",
      items: [
        "Tea", "Coffee", "Milk (Cup / Glass)",
        "Kanda Poha", "Batata Poha", "Upma", "Sheera",
        "Single / Double Omelet Pav", "Single / Double Egg Burji Pav",
        "Plain / Masala / Cheese Maggi",
        "Finger Chips", "Bread Butter", "Jam Bread",
      ],
    },
    {
      title: "Lunch & Dinner",
      timing: "12:30 – 2:30 PM • 8:00 – 9:30 PM",
      items: [
        "Special Veg Thali", "Veg Thali", "Baida (Egg) Curry Thali",
        "Chicken Thali", "Mutton Thali",
        "Chicken Handi (1 Kg / ½ Kg)", "Mutton Handi (1 Kg / ½ Kg)",
        "Plain Rice", "Chapati", "Bhakari", "Green Salad",
        "Boiled Egg", "Papad (Roasted / Fried)",
        "Extra Dal Vati", "Extra Bhaji Plate",
      ],
    },
    {
      title: "Also available",
      timing: "",
      items: [
        "Hot water bucket (7:30 – 10:00 AM)",
        "Extra mattress set (per day)",
        "Cold drinks & Bisleri",
      ],
    },
  ],

  // Photo gallery — just add photos here (order here = order shown). Empty = "Photo coming soon" tiles.
  gallery: [] as RoomImage[],

  booking: {
    /** % of the total paid online when booking (100 = full payment, 30 = 30% advance). */
    advancePercent: 100, // [PLACEHOLDER]
    checkInTime: "12:00 PM",
    checkOutTime: "10:00 AM",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in. Message us on WhatsApp to change your dates.",
  },

  // Approved reviews copied manually. These are NOT synced automatically with Google.
  manualReviews: [] as ManualReview[],
};
