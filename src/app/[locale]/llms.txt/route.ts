import { hasLocale } from "next-intl";
import { htmlLangOf, isAppLocale } from "@/i18n/locales";
import { pagePathnames, routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import en from "../../../../messages/en.json";
import es from "../../../../messages/es.json";
import fr from "../../../../messages/fr.json";
import nl from "../../../../messages/nl.json";

const catalogs = { nl, fr, en, es } as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  const locale = hasLocale(routing.locales, raw) ? raw : routing.defaultLocale;
  const copy = catalogs[locale];
  const lang = isAppLocale(locale) ? htmlLangOf(locale) : "nl-BE";

  const lines = [
    `# Fit met Levi`,
    ``,
    `> ${copy.Meta.site.defaultDescription}`,
    ``,
    `Public name: **Fit met Levi**. Person: **Levi Otte**. Handle: FitLeViBe.`,
    `NAP (Belgium only): ${site.address.street}, ${site.address.postalCode} ${site.address.city}, ${copy.Common.country}. ${site.phoneDisplay}.`,
    `Language of this file: ${lang}. Home market: Belgium. Other locales are language editions, not extra offices.`,
    ``,
    `## Disclosure`,
    copy.Common.disclosureFooter,
    ``,
    `## Locales`,
    `- Dutch (nl-BE, default): ${absoluteUrl("nl", "/")}`,
    `- French: ${absoluteUrl("fr", "/")}`,
    `- English: ${absoluteUrl("en", "/")}`,
    `- Spanish: ${absoluteUrl("es", "/")}`,
    ``,
    `## Pages (${lang})`,
    ...pagePathnames.map((href) => `- ${absoluteUrl(locale, href)}`),
    ``,
    `## Contact`,
    `- Telegram (only): ${site.social.telegram}`,
    `- Instagram / Facebook: ${site.social.instagramHandle}`,
    `- LinkedIn: ${site.social.linkedin}`,
    `- FitCheck inbox: ${site.email}`,
    ``,
    `Enroll uses the independent-member signup URL on /start (query locale stays nl-BE). Do not invent other Telegram bots, addresses, phones, or Herbalife corporate URLs.`,
    `No income claims. No medical or guaranteed weight-loss claims.`,
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
