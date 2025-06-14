/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@cozy/db',
    '@cozy/ui',
    '@cozy/styling',
  ]
};

export default nextConfig;
