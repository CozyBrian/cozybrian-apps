import createMDX from "@next/mdx";
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cozy/db", "@cozy/ui", "@cozy/styling"],
  experimental: {
    viewTransition: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }
    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter", // parses --- yaml ---
      ["remark-mdx-frontmatter", { name: "metadata" }], // exports as `export const frontmatter = {...}`
    ],
    rehypePlugins: [
      [
        "rehype-pretty-code",
        {
          theme: "github-dark-default", // any Shiki theme
          keepBackground: false, // allows Tailwind to style backgrounds
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
