import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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
