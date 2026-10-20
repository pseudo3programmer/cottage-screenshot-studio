import { createServerFn } from "@tanstack/react-start";

export type GoogleReview = {
  author: string;
  authorUrl?: string;
  photo?: string;
  rating: number;
  text: string;
  relativeTime?: string;
};

export type ReviewsResult =
  | { status: "ok"; rating?: number; total?: number; reviews: GoogleReview[]; mapsUrl?: string }
  | { status: "not_configured" }
  | { status: "error"; message: string };

let cache: { at: number; data: ReviewsResult } | null = null;
const TTL = 60 * 60 * 1000;

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(async (): Promise<ReviewsResult> => {
  const key = process.env["GOOGLE_PLACES_API_KEY"];
  const placeId = process.env["GOOGLE_PLACE_ID"];
  if (!key || !placeId) return { status: "not_configured" };
  if (cache && Date.now() - cache.at < TTL) return cache.data;
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
    });
    if (!res.ok) {
      console.error("Places error", res.status, await res.text());
      return { status: "error", message: `Google returned ${res.status}` };
    }
    const j = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      googleMapsUri?: string;
      reviews?: Array<{
        rating?: number;
        relativePublishTimeDescription?: string;
        text?: { text?: string };
        originalText?: { text?: string };
        authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
      }>;
    };
    const data: ReviewsResult = {
      status: "ok",
      rating: j.rating,
      total: j.userRatingCount,
      mapsUrl: j.googleMapsUri,
      reviews: (j.reviews ?? []).slice(0, 5).map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri,
        photo: r.authorAttribution?.photoUri,
        rating: r.rating ?? 0,
        text: r.text?.text ?? r.originalText?.text ?? "",
        relativeTime: r.relativePublishTimeDescription,
      })),
    };
    cache = { at: Date.now(), data };
    return data;
  } catch (e) {
    console.error(e);
    return { status: "error", message: "Could not reach Google" };
  }
});
