import { getLocale, getTranslations } from "next-intl/server";
import { SectionCta } from "@/components/fitcheck-cta";
import { getGoogleReviews } from "@/lib/google-reviews";

function Stars({ value, label }: { value: number; label: string }) {
  const rounded = Math.round(value);
  return (
    <span role="img" aria-label={label} className="inline-flex gap-0.5 text-[#e8a317]">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${n <= rounded ? "" : "opacity-25"}`}
          aria-hidden="true"
          fill="currentColor"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Visible Google reviews (on-page only, no Review/AggregateRating schema).
 * Renders nothing when the Places key / place id is missing or Google fails.
 */
export async function GoogleReviews() {
  const locale = await getLocale();
  const data = await getGoogleReviews(locale);
  if (!data) return null;

  const t = await getTranslations("Reviews");
  const ratingText = data.rating.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  return (
    <section className="border-t border-indigo/10 bg-paper" aria-labelledby="google-reviews-title">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
        <h2
          id="google-reviews-title"
          className="font-display mt-4 max-w-lg text-4xl leading-tight text-indigo sm:text-5xl"
        >
          {t("title")}
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-display text-3xl text-indigo">{ratingText}</span>
          <Stars value={data.rating} label={t("stars", { rating: ratingText })} />
          <a
            href={data.googleMapsUri}
            target="_blank"
            rel="noopener"
            className="text-base text-muted underline decoration-indigo/30 underline-offset-4 hover:text-indigo"
          >
            {t("count", { count: data.userRatingCount })}
          </a>
        </div>

        {data.reviews.length > 0 ? (
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {data.reviews.map((review) => (
              <li
                key={review.id}
                className="flex flex-col rounded-2xl border border-indigo/10 bg-cream p-6"
              >
                <Stars value={review.rating} label={t("stars", { rating: review.rating })} />
                <p className="mt-4 line-clamp-6 flex-1 text-base leading-7 text-indigo">
                  {review.text}
                </p>
                <p className="mt-5 text-sm text-muted">
                  {review.authorUri ? (
                    <a
                      href={review.authorUri}
                      target="_blank"
                      rel="noopener nofollow"
                      className="font-semibold text-indigo hover:underline"
                    >
                      {review.authorName}
                    </a>
                  ) : (
                    <span className="font-semibold text-indigo">{review.authorName}</span>
                  )}
                  {review.relativeTime ? <> · {review.relativeTime}</> : null}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <a
            href={data.googleMapsUri}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-11 items-center font-semibold text-green hover:text-green-dark"
          >
            {t("cta")} →
          </a>
          <p className="text-xs text-[#5e5e5e]">
            {t("source")}{" "}
            <span className="font-medium" translate="no" style={{ fontFamily: "Roboto, Arial, sans-serif" }}>
              Google Maps
            </span>
          </p>
        </div>
        <SectionCta />
      </div>
    </section>
  );
}
