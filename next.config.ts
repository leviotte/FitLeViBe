import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com",
      "font-src 'self' data:",
      "connect-src 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Never use the Vercel Image Optimizer (/_next/image). Photos come
    // pre-sized and auto-formatted from the Unsplash CDN.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ["resend"],
  experimental: {
    // Hash-based integrity on framework scripts (pairs with CSP).
    sri: { algorithm: "sha256" },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    // Spanish edition removed (2026-10-03): 301 every /es URL to its Dutch page.
    const spanishGone = [
      { source: "/es", destination: "/" },
      { source: "/es/programas", destination: "/programmas" },
      { source: "/es/sobre", destination: "/over" },
      { source: "/es/privacidad", destination: "/privacy" },
      { source: "/es/:path*", destination: "/:path*" },
    ].map((rule) => ({ ...rule, statusCode: 301 as const }));
    return [
      {
        source: "/",
        has: [{ type: "host", value: "fitlevibe.com" }],
        destination: "https://www.fitlevibe.com/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "fitlevibe.com" }],
        destination: "https://www.fitlevibe.com/:path*",
        permanent: true,
      },
      ...spanishGone,
    ];
  },
};

export default withNextIntl(nextConfig);
