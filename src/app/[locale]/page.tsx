import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutLevi } from "@/components/about-levi";
import { Faq } from "@/components/faq";
import { FitCheckSection } from "@/components/fitcheck-section";
import { GoalCards } from "@/components/goal-cards";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { FaqJsonLd } from "@/components/json-ld";
import { StartBand } from "@/components/start-band";
import { TrustRow } from "@/components/trust-row";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { localeMetadata } from "@/lib/seo";

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
    pathname: "/",
    title: t("home.title"),
    description: t("home.description"),
    absoluteTitle: true,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);

  return (
    <>
      <FaqJsonLd />
      <Hero />
      <TrustRow />
      <GoalCards />
      <HowItWorks />
      <AboutLevi />
      <StartBand />
      <FitCheckSection />
      <Faq />
    </>
  );
}
