import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...routing.locales.map(
      (locale) =>
        `  <sitemap><loc>${site.url}/sitemap/${locale}.xml</loc></sitemap>`,
    ),
    `</sitemapindex>`,
    ``,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
