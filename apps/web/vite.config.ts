import { fileURLToPath } from "node:url";

import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "@mdx-js/rollup";
import { kvDataAdapter } from "@vinext/cloudflare/cache/kv-data-adapter";
import { staticAssetsAdapter } from "@vinext/cloudflare/cache/static-assets-adapter";
import { rehypePrettyCode } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import vinext from "vinext";
import { defineConfig, loadEnv } from "vite";

import { getHeadings } from "../../packages/blog/src/headings";

export default defineConfig(({ mode }) => ({
  define: {
    "process.env.NEXT_PUBLIC_BLOG_URL": JSON.stringify(
      process.env.NEXT_PUBLIC_BLOG_URL ||
        loadEnv(mode, process.cwd(), "NEXT_PUBLIC_").NEXT_PUBLIC_BLOG_URL ||
        "https://blog.cozybrian.dev",
    ),
  },
  resolve: {
    alias: [
      {
        find: /^@cozy\/blog$/,
        replacement: fileURLToPath(
          new URL("../../packages/blog/src/cloudflare.ts", import.meta.url),
        ),
      },
    ],
  },
  plugins: [
    {
      name: "cozy-blog-headings",
      enforce: "pre",
      transform(source, id) {
        if (!id.endsWith(".mdx")) return;
        return {
          code: `${source}\n\nexport const headings = ${JSON.stringify(getHeadings(source))};\n`,
          map: null,
        };
      },
    },
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "metadata" }],
      ],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "github-dark-default",
            keepBackground: false,
            tokensMap: { fn: "entity.name.function" },
          },
        ],
      ],
    }),
    vinext({
      cache: { data: kvDataAdapter(), cdn: staticAssetsAdapter() },
      prerender: { routes: "*" },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
}));
