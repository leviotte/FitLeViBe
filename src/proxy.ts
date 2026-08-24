import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
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

export default function proxy(request: NextRequest) {
  const crawler = isCrawler(request);
  const handleI18n = createMiddleware({
    ...routing,
    localeDetection: !crawler,
    localeCookie: crawler ? false : routing.localeCookie,
  });
  const headers = new Headers(request.headers);
  headers.set("x-public-pathname", request.nextUrl.pathname);
  headers.set("x-public-url", request.nextUrl.origin + request.nextUrl.pathname);
  return handleI18n(new NextRequest(request, { headers }));
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
    "/llms.txt",
    "/(fr|en|es)/llms.txt",
  ],
};
