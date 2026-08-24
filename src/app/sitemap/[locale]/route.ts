import { hasLocale } from "next-intl";
import { routing, pagePathnames, type AppPathname } from "@/i18n/routing";
import { languageAlternates, absoluteUrl } from "@/lib/seo";
import type { AppLocale } from "@/i18n/locales";

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale: `${locale}.xml` }));
}

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: raw } = await params;
  const id = raw.replace(/\.xml$/, "");
  if (!hasLocale(routing.locales, id)) {
    return new Response("Not found", { status: 404 });
  }

  const locale = id as AppLocale;
  const lastModified = new Date().toISOString();

  const urls = pagePathnames.map((pathname: AppPathname) => {
    const loc = xmlEscape(absoluteUrl(locale, pathname));
    const alternates = Object.entries(languageAlternates(pathname))
      .map(
        ([hreflang, href]) =>
          `    <xhtml:link rel="alternate" hreflang="${xmlEscape(hreflang)}" href="${xmlEscape(href)}" />`,
      )
      .join("\n");
    const changefreq = pathname === "/" ? "weekly" : "monthly";
    const priority = pathname === "/" ? "1.0" : "0.7";
    return [
      `  <url>`,
      `    <loc>${loc}</loc>`,
      alternates,
      `    <lastmod>${lastModified}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      `  </url>`,
    ].join("\n");
  });

  const body = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
