import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  serverExternalPackages: ["resend"],
  async redirects() {
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
    ];
  },
};

export default withNextIntl(nextConfig);
