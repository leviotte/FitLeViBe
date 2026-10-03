import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Faq } from "@/components/faq";
import { FitCheckSection } from "@/components/fitcheck-section";
import { GoalCards } from "@/components/goal-cards";
import { GoogleReviews } from "@/components/google-reviews";
import { Hero } from "@/components/hero";
import { Approach } from "@/components/home/approach";
import { Measures } from "@/components/home/measures";
import { OwnResult } from "@/components/home/own-result";
import { HowItWorks } from "@/components/how-it-works";
import { FaqJsonLd } from "@/components/json-ld";
import { isAppLocale } from "@/i18n/locales";
import { routing } from "@/i18n/routing";
import { localeMetadata } from "@/lib/seo";
import { isGoalId, type GoalId } from "@/lib/site";

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

function parseGoal(value: string | string[] | undefined): GoalId | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw && isGoalId(raw) ? raw : undefined;
}

/**
 * One goal: a free FitCheck request. Every section ends in the same CTA
 * (→ #fitcheck); the form is the final section.
 */
export default async function HomePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ doel?: string | string[] }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const defaultGoal = parseGoal((await searchParams).doel);

  return (
    <>
      <FaqJsonLd />
      <Hero />
      <Measures />
      <GoalCards />
      <Approach />
      <HowItWorks />
      <OwnResult />
      <Suspense fallback={null}>
        <GoogleReviews />
      </Suspense>
      <Faq />
      <FitCheckSection defaultGoal={defaultGoal} />
    </>
  );
}
