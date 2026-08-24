import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EnrollButton, EnrollDisclosure, TelegramButton } from "@/components/enroll";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
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
    pathname: "/start",
    title: t("start.title"),
    description: t("start.description"),
  });
}

export default async function StartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const t = await getTranslations("Start");

  return (
    <div className="mx-auto flex min-h-[78vh] max-w-lg flex-col justify-center px-6 py-24 sm:px-8 sm:py-32">
      <p className="text-sm font-medium tracking-wide text-green">
        {t("kicker", { name: site.personName, city: site.address.city })}
      </p>
      <h1 className="font-display mt-6 text-[2.75rem] leading-[1.08] text-indigo sm:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-8 text-xl leading-9 text-muted">{t("body")}</p>

      <div className="mt-12 flex flex-col gap-4">
        <EnrollButton fullWidth className="min-h-14 text-lg" />
        <EnrollDisclosure />
        <TelegramButton
          fullWidth
          className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-indigo/15 bg-white px-7 text-center text-lg font-semibold text-indigo transition hover:bg-sand"
        />
      </div>

      <p className="mt-14 text-sm leading-6 text-muted">
        {t("meta", {
          city: site.address.city,
          year: site.foundedYear,
          rating: site.googleRating,
        })}
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">{t("note")}</p>
    </div>
  );
}
