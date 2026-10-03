import { preload } from "react-dom";
import { getTranslations } from "next-intl/server";
import { FitCheckCta } from "@/components/fitcheck-cta";
import { Icon } from "@/components/icons";
import { ResponsivePicture } from "@/components/responsive-picture";
import { Link } from "@/i18n/navigation";
import { leviPhotos } from "@/lib/levi-photos";
import { site } from "@/lib/site";

const photo = leviPhotos.strongViking;
/** Rendered width: full column on mobile/tablet, 30rem (480px) on desktop. */
const SIZES = "(max-width: 1024px) calc(100vw - 2.5rem), 480px";

/**
 * Hero = Levi introduces himself (Strong Viking photo) + the free FitCheck CTA.
 * The photo is the LCP image: eager, fetchpriority=high, AVIF preloaded.
 */
export async function Hero() {
  const t = await getTranslations("Hero");
  const photoAlts = await getTranslations("Photos");
  const points = t.raw("points") as string[];

  preload(`${photo.base}-800.avif`, {
    as: "image",
    type: "image/avif",
    fetchPriority: "high",
    imageSrcSet: photo.widths.map((w) => `${photo.base}-${w}.avif ${w}w`).join(", "),
    imageSizes: SIZES,
  });

  return (
    <section className="relative overflow-hidden" id="over">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-14 lg:pb-20 lg:pt-14">
        <div className="lg:col-span-7">
          <p className="text-base font-semibold text-green sm:text-lg">
            {t("kicker", { name: site.personName })}
          </p>
          <h1 className="font-display mt-3 text-[2.5rem] leading-[1.05] text-indigo sm:text-6xl lg:text-[4rem]">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-[34rem] text-lg leading-8 text-muted">{t("body")}</p>
          <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <FitCheckCta />
            <Link
              href="/over"
              className="hidden min-h-11 items-center font-semibold text-green hover:text-green-dark sm:inline-flex"
            >
              {t("more")} →
            </Link>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-indigo">
            {points.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <Icon name="check" className="h-4 w-4 text-green" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto max-w-[30rem] overflow-hidden rounded-[2rem] bg-sand lg:mr-0">
            <ResponsivePicture
              {...photo}
              alt={photoAlts("levi")}
              sizes={SIZES}
              priority
              className="block aspect-square h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
