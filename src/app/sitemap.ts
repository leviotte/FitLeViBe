import type { MetadataRoute } from "next";
import { hasLocale } from "next-intl";
import { routing, pagePathnames, type AppPathname } from "@/i18n/routing";
import { languageAlternates, absoluteUrl } from "@/lib/seo";
import type { AppLocale } from "@/i18n/locales";

export async function generateSitemaps() {
  return routing.locales.map((id) => ({ id }));
}

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const id = await props.id;
  if (!hasLocale(routing.locales, id)) return [];

  const locale = id as AppLocale;
  const lastModified = new Date();

  return pagePathnames.map((pathname: AppPathname) => ({
    url: absoluteUrl(locale, pathname),
    lastModified,
    changeFrequency: pathname === "/" ? "weekly" : "monthly",
    priority: pathname === "/" ? 1 : 0.7,
    alternates: {
      languages: languageAlternates(pathname),
    },
  }));
}
