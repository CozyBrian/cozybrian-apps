import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cozy/ui", "@cozy/styling"],
  experimental: {
    viewTransition: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
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
