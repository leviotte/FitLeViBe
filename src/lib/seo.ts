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

/** Origin-absolute URL. NL home is slashless (`https://www.fitlevibe.com`), matching `/fr` `/en` `/es`. */
export function absoluteUrl(locale: AppLocale, href: AppPathname): string {
  const path = localizedPath(locale, href);
  if (path === "/") return site.url;
  return `${site.url}${path.endsWith("/") ? path.slice(0, -1) : path}`;
}

type PageMetaTitleKey =
  | "home.title"
  | "start.title"
  | "fitcheck.title"
  | "programs.title"
  | "about.title"
  | "privacy.title";

type PageMetaDescriptionKey =
  | "home.description"
  | "start.description"
  | "fitcheck.description"
  | "programs.description"
  | "about.description"
  | "privacy.description";

export const PAGE_META: Record<
  AppPathname,
  {
    titleKey: PageMetaTitleKey;
    descriptionKey: PageMetaDescriptionKey;
    absoluteTitle: boolean;
  }
> = {
  "/": {
    titleKey: "home.title",
    descriptionKey: "home.description",
    absoluteTitle: true,
  },
  "/start": {
    titleKey: "start.title",
    descriptionKey: "start.description",
    absoluteTitle: false,
  },
  "/fitcheck": {
    titleKey: "fitcheck.title",
    descriptionKey: "fitcheck.description",
    absoluteTitle: false,
  },
  "/programmas": {
    titleKey: "programs.title",
    descriptionKey: "programs.description",
    absoluteTitle: false,
  },
  "/over": {
    titleKey: "about.title",
    descriptionKey: "about.description",
    absoluteTitle: false,
  },
  "/privacy": {
    titleKey: "privacy.title",
    descriptionKey: "privacy.description",
    absoluteTitle: false,
  },
};

export function documentTitle(title: string, absoluteTitle = false): string {
  return absoluteTitle ? title : `${title} · ${site.publicName}`;
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
  const fullTitle = documentTitle(title, absoluteTitle);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(pathname),
    },
    openGraph: {
      title: fullTitle,
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
      title: fullTitle,
      description,
    },
  };
}
