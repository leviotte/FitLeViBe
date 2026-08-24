import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

/**
 * Locale detection for humans; crawlers are never redirected off Dutch `/`
 * or off an explicit `/fr` `/en` `/es` URL.
 */
const CRAWLER_UA =
  /bot|crawler|spider|crawling|google|bingpreview|yandex|baidu|duckduck|slurp|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegrambot|applebot|semrush|ahrefs|mj12|dotbot|petalbot|bytespider|gptbot|chatgpt|claudebot|anthropic|perplexity|ccbot|amazonbot|ia_archiver/i;

function isCrawler(request: NextRequest) {
  return CRAWLER_UA.test(request.headers.get("user-agent") ?? "");
}

function skipI18n(pathname: string) {
  return (
    pathname.startsWith("/icon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname.startsWith("/sitemap") ||
    pathname === "/robots.txt"
  );
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (skipI18n(pathname)) {
    return NextResponse.next();
  }

  const crawler = isCrawler(request);
  const handleI18n = createMiddleware({
    ...routing,
    localeDetection: !crawler,
    localeCookie: crawler ? false : routing.localeCookie,
  });
  const headers = new Headers(request.headers);
  headers.set("x-public-pathname", pathname);
  headers.set("x-public-url", request.nextUrl.origin + pathname);
  headers.set("x-public-search", request.nextUrl.search);
  return handleI18n(new NextRequest(request, { headers }));
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/llms.txt",
    "/(fr|en|es)/llms.txt",
  ],
};
