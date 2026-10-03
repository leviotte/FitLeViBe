import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["nl", "fr", "en"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  /**
   * `/` is always Dutch. Explicit `/fr` `/en` are respected.
   * Spanish was removed (2026-10-03); `/es/*` 301s to Dutch in next.config.ts.
   * No Accept-Language or cookie redirects — humans and crawlers alike.
   */
  localeDetection: false,
  localeCookie: false,
  /** We emit hreflang ourselves (nl-BE + x-default = Dutch sibling). */
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/start": "/start",
    "/fitcheck": "/fitcheck",
    "/programmas": {
      nl: "/programmas",
      fr: "/programmes",
      en: "/programs",
    },
    "/over": {
      nl: "/over",
      fr: "/a-propos",
      en: "/about",
    },
    "/privacy": {
      nl: "/privacy",
      fr: "/confidentialite",
      en: "/privacy",
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;

export const pagePathnames = [
  "/",
  "/start",
  "/fitcheck",
  "/programmas",
  "/over",
  "/privacy",
] as const satisfies readonly AppPathname[];
