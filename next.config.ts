import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {
    default: {
      stale: 60 * 60 * 24,
      revalidate: 60 * 60 * 24,
      expire: 60 * 60 * 24,
    },
  },
};

export default nextConfig;
