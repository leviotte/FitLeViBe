import type { Metadata } from "next";
import {
  hreflangOf,
  ogLocaleOf,
  otherOgLocales,
  type AppLocale,
} from "@/i18n/locales";
import { routing, type AppPathname } from "@/i18n/routing";
import { publicPath } from "@/lib/paths";
import { site } from "@/lib/site";

export function localizedPath(locale: AppLocale, href: AppPathname): string {
  return publicPath(locale, href);
}

export function absoluteUrl(locale: AppLocale, href: AppPathname): string {
  return `${site.url}${localizedPath(locale, href)}`;
}

/** hreflang map: nl-BE / fr / en / es + x-default = Dutch sibling of this page. */
export function languageAlternates(
  href: AppPathname,
): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[hreflangOf(locale)] = absoluteUrl(locale, href);
  }

  languages["x-default"] = absoluteUrl("nl", href);
  return languages;
}

export function localeMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: AppLocale;
  pathname: AppPathname;
  title: string;
  description: string;
}): Metadata {
  const canonical = absoluteUrl(locale, pathname);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: ogLocaleOf(locale),
      alternateLocale: otherOgLocales(locale),
      siteName: site.publicName,
      type: "website",
      images: [{ url: "/opengraph-image" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
