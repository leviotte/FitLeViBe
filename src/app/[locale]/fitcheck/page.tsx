import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FitCheckSection } from "@/components/fitcheck-section";
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
    pathname: "/fitcheck",
    title: t("fitcheck.title"),
    description: t("fitcheck.description"),
  });
}

function parseGoal(value: string | string[] | undefined): GoalId | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw && isGoalId(raw)) return raw;
  return undefined;
}

export default async function FitCheckPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ doel?: string | string[] }>;
}) {
  const { locale } = await params;
  if (isAppLocale(locale)) setRequestLocale(locale);
  const query = await searchParams;
  const defaultGoal = parseGoal(query.doel);

  return (
    <div className="pt-6">
      <FitCheckSection defaultGoal={defaultGoal} />
    </div>
  );
}
