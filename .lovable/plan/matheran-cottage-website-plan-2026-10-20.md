# Matheran Cottage Website — Plan

## What you'll get
A mobile-first, one-page cottage website (smooth-scroll sections) with warm, nature-inspired styling, clear placeholders for every fact you haven't supplied yet, and WhatsApp as the main booking action.

## Look and feel
- Colors: forest green, cream, warm beige, muted brown, terracotta accents.
- Fonts: Cormorant Garamond (elegant headings) + Karla (clean body text).
- Rounded photos, soft shadows, gentle fade-in on scroll. No flashy gradients or popups.
- Until your photos arrive, soft neutral placeholder tiles labelled "Your photo here" (no fake property photos).

## Page sections
1. **Header** — logo placeholder + name, menu (About, Rooms & Photos, Reviews, Location, Contact), slide-out menu on mobile.
2. **Hero** — big photo, "Your Peaceful Getaway in Matheran", short welcome, buttons: "Enquire on WhatsApp" and "Explore Our Rooms".
3. **About + Highlights** — short description and highlight cards (surroundings, comfort, nearby attractions, suitability) with placeholder text.
4. **Rooms & Gallery** — room cards with photo carousel, name, description, facilities; occupancy/beds/price shown only once filled in; tap for full-screen swipeable lightbox; WhatsApp enquiry per room + "Ask About Availability".
5. **Guest Reviews** — Google rating, count and reviews when the Google connection is set up; otherwise a clean fallback with manually added reviews (clearly marked as not auto-synced) plus "Read All Reviews on Google" and "Write a Review".
6. **Location** — embedded Google Map once your address/link is provided (placeholder until then, no guessed location), address, "Get Directions", WhatsApp button.
7. **Contact** — WhatsApp (pre-filled friendly message), Call, Instagram, optional Email.
8. **Footer** — logo, name, Matheran, Instagram, WhatsApp, Maps link, copyright.
9. **Sticky WhatsApp button** at the bottom on mobile, kept clear of content.

## What you'll need to provide later
Logo, cottage name, photos (exterior + rooms), WhatsApp number, phone, Instagram URL, Google Maps link + address, descriptions, room details, and a Google Places API key + Place ID for live reviews (Google requires billing on the key).

## Technical details
- Single route `/` with section anchors (user explicitly asked for one scrolling page); full SEO head (title, description, OG, local terms).
- All editable content in one file `src/content/site.ts` (cottage info, contacts, rooms with ordered image arrays, manual reviews, map embed URL). Empty optional fields are hidden.
- Reviews: enable Lovable Cloud only for secret storage; server function calls Google Places API (New) Place Details with `GOOGLE_PLACES_API_KEY` + `GOOGLE_PLACE_ID`, returns rating/count/up to 5 reviews with author attribution and "Powered by Google" attribution; short in-memory cache; graceful fallback on missing key or error.
- Map via Google Maps embed iframe (keyless `output=embed` URL) from the link you supply.
- Lightbox/carousel via existing lightweight embla-carousel (shadcn carousel) — swipe + keyboard support.
- Semantic HTML, alt text, 44px tap targets, lazy-loaded images, works from 320px wide.
- Tests for WhatsApp link builder (number + prefilled message) and "hide empty room fields" rule.
