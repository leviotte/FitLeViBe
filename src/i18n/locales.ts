import { routing } from "@/i18n/routing";

export type AppLocale = (typeof routing.locales)[number];

/** `<html lang>` — nl uses BCP 47 nl-BE; others use the language subtag. */
export const htmlLang: Record<AppLocale, string> = {
  nl: "nl-BE",
  fr: "fr",
  en: "en",
  es: "es",
};

/** hreflang codes. Dutch is nl-BE, not nl. */
export const hreflang: Record<AppLocale, string> = {
  nl: "nl-BE",
  fr: "fr",
  en: "en",
  es: "es",
};

/** Open Graph og:locale */
export const ogLocale: Record<AppLocale, string> = {
  nl: "nl_BE",
  fr: "fr_FR",
  en: "en_US",
  es: "es_ES",
};

export const localeSwitcherLabel: Record<AppLocale, string> = {
  nl: "NL",
  fr: "FR",
  en: "EN",
  es: "ES",
};

export function isAppLocale(value: string | null | undefined): value is AppLocale {
  return !!value && (routing.locales as readonly string[]).includes(value);
}

export function htmlLangOf(locale: AppLocale): string {
  return htmlLang[locale];
}

export function hreflangOf(locale: AppLocale): string {
  return hreflang[locale];
}

export function ogLocaleOf(locale: AppLocale): string {
  return ogLocale[locale];
}

export function otherOgLocales(locale: AppLocale): string[] {
  return routing.locales.filter((item) => item !== locale).map(ogLocaleOf);
}
