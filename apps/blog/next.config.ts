import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@cozy/ui", "@cozy/styling"],
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
