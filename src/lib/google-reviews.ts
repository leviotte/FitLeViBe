/**
 * Real Google reviews for the Fit met Levi Google Business Profile, via
 * Places API (New) Place Details. Server-side only; the API key never
 * reaches the browser.
 *
 * Free-tier safety: the response is stored in the Next.js Data Cache for
 * 24 h (revalidate 86400) per language, so at most ~4 calls a day.
 *
 * Without GOOGLE_PLACES_API_KEY or FITLEVIBE_PLACE_ID this returns null
 * and makes no request, so the section renders nothing.
 */

export type GoogleReview = {
  id: string;
  authorName: string;
  authorUri?: string;
  rating: number;
  relativeTime: string;
  text: string;
};

export type GooglePlaceReviews = {
  displayName?: string;
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReview[];
};

type LocalizedText = { text?: string; languageCode?: string };

type PlaceDetailsResponse = {
  displayName?: LocalizedText;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    name?: string;
    relativePublishTimeDescription?: string;
    rating?: number;
    text?: LocalizedText;
    originalText?: LocalizedText;
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

const FIELD_MASK = "rating,userRatingCount,reviews,googleMapsUri,displayName";
const ONE_DAY = 86400;

export async function getGoogleReviews(
  languageCode: string,
): Promise<GooglePlaceReviews | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.FITLEVIBE_PLACE_ID?.trim();
  if (!apiKey || !placeId) return null;

  try {
    const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(
      placeId,
    )}?languageCode=${encodeURIComponent(languageCode)}`;
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      cache: "force-cache",
      next: { revalidate: ONE_DAY, tags: ["google-reviews"] },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as PlaceDetailsResponse;

    if (
      typeof data.rating !== "number" ||
      typeof data.userRatingCount !== "number" ||
      data.userRatingCount < 1 ||
      !data.googleMapsUri
    ) {
      return null;
    }

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .map((review, index) => ({
        id: review.name ?? String(index),
        authorName: review.authorAttribution?.displayName?.trim() ?? "",
        authorUri: review.authorAttribution?.uri,
        rating: typeof review.rating === "number" ? review.rating : 0,
        relativeTime: review.relativePublishTimeDescription ?? "",
        // The reviewer's own words; fall back to Google's translation.
        text: (review.originalText?.text ?? review.text?.text ?? "").trim(),
      }))
      .filter((review) => review.authorName && review.text && review.rating > 0)
      .slice(0, 3);

    return {
      displayName: data.displayName?.text,
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      googleMapsUri: data.googleMapsUri,
      reviews,
    };
  } catch {
    return null;
  }
}
