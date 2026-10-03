import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/authority/", destination: "/platform/", permanent: true },
      { source: "/authority", destination: "/platform/", permanent: true },
      { source: "/evidence/", destination: "/research/", permanent: true },
      { source: "/evidence", destination: "/research/", permanent: true },
      { source: "/public-purpose/", destination: "/use-cases/", permanent: true },
      { source: "/public-purpose", destination: "/use-cases/", permanent: true },
    ];
  },
};

export default nextConfig;
