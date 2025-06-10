import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    '@cozy/ui',
    '@cozy/styling',
  ]
};

export default nextConfig;
