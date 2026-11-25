import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90], remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/aida-public/**" }] },
  async headers() {
    return [{
      source: "/frames/sequence-v1/:path*",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    }];
  },
};

export default nextConfig;
