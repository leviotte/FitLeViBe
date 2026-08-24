import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

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
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "");
    return NextResponse.redirect(url, 308);
  }
  if (skipI18n(pathname)) {
    return NextResponse.next();
  }

  const handleI18n = createMiddleware(routing);
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
