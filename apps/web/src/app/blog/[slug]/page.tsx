// app/posts/[slug]/page.tsx
import fs from "node:fs/promises";
import path from "node:path";

import { compile } from "@mdx-js/mdx";
import { unstable_ViewTransition as ViewTransition } from "react";
import * as runtime from "react/jsx-runtime";
import { rehypePrettyCode } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import { getMDXComponents } from "../../../../mdx-components";

const POSTS_DIR = path.join(process.cwd(), "src", "posts");

type pageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const files = await fs.readdir(POSTS_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}

export async function generateMetadata({ params }: pageProps) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const compiled = String(
    await compile(source, {
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "metadata" }],
      ],

      outputFormat: "function-body",
    }),
  );

  // Execute compiled code to extract metadata
  const { metadata } = await evalMdx(compiled);
  return {
    title: String(metadata?.title ?? slug),
    description: String(metadata?.description ?? ""),
  };
}

export default async function Page({ params }: pageProps) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");

  const prettyCodeOptions = {
    theme: "github-dark-default", // any Shiki theme
    keepBackground: false, // allows Tailwind to style backgrounds
    tokensMap: {
      fn: "entity.name.function",
    },
  };

  const compiled = String(
    await compile(source, {
      outputFormat: "function-body", // no top-level export
      // jsx: true, // emit JSX instead of compiled React.createElement
      jsxImportSource: "react", // needed for automatic runtime
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: "metadata" }],
      ],
      rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
    }),
  );

  const { default: Content, metadata } = await evalMdx(compiled);

  const components = getMDXComponents();
  return (
    <div>
      <ViewTransition name={slug}>
        <h1 className="text-3xl font-bold mb-4">{metadata.title}</h1>
      </ViewTransition>
      <p className="text-sm text-gray-500 mb-6">{metadata.date}</p>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <Content components={components} />
        </div>
      </div>
    </div>
  );
}

// // Helper: turn compiled MDX into a renderable React component + metadata
function evalMdx(code: string) {
  // code is compiled.value from @mdx-js/mdx with outputFormat: "function-body"
  const fn = new Function(code as unknown as string); // creates the MDX function
  // Pass the runtime as the first argument (arguments[0] in code)
  return fn(runtime);
}
