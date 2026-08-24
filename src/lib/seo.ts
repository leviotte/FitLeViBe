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
  absoluteTitle = false,
}: {
  locale: AppLocale;
  pathname: AppPathname;
  title: string;
  description: string;
  /** Full document title; skip the layout `%s · Fit met Levi` template. */
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = absoluteUrl(locale, pathname);
  const documentTitle = absoluteTitle
    ? title
    : `${title} · ${site.publicName}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      title: documentTitle,
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
      title: documentTitle,
      description,
    },
  };
}
