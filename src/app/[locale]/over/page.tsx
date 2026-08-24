import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StartButton } from "@/components/enroll";
import { Link } from "@/i18n/navigation";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { photos } from "@/lib/photos";
import { localeMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isAppLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return localeMetadata({
    locale,
    pathname: "/over",
    title: t("about.title"),
    description: t("about.description"),
  });
}

export default async function OverPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const t = await getTranslations("About");
  const common = await getTranslations("Common");
  const photoAlts = await getTranslations("Photos");

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="text-sm font-medium tracking-wide text-green">{t("eyebrow")}</p>
      <h1 className="font-display mt-4 max-w-2xl text-4xl leading-tight text-indigo sm:text-6xl">
        {t("pageTitle")}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
        {t("pageLead", {
          city: site.address.city,
          year: site.foundedYear,
          rating: site.googleRating,
        })}
      </p>

      <div className="mt-14 grid items-start gap-12 lg:grid-cols-12">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sand lg:col-span-5">
          <Image
            src={photos.nutrition}
            alt={photoAlts("nutrition")}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { k: "20%", v: common("training") },
              { k: "80%", v: common("nutrition") },
              { k: "100%", v: common("mindset") },
            ].map((item) => (
              <div
                key={item.v}
                className="rounded-3xl border border-indigo/10 bg-white px-5 py-6"
              >
                <p className="font-display text-3xl text-green">{item.k}</p>
                <p className="mt-1 text-sm text-muted">{item.v}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-xl text-base leading-7 text-muted">{t("p1")}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">{t("p2")}</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">{t("p3")}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <StartButton />
            <Link
              href="/fitcheck"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-indigo/15 bg-white px-6 text-base font-semibold text-indigo hover:bg-sand"
            >
              {common("fitCheckFirst")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
