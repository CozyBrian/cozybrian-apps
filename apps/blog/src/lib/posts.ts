import fs from "node:fs/promises";
import path from "node:path";

import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { rehypePrettyCode, type Options } from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import type { MDXFile, MDXFileMeta, MDXHeader } from "@/types";

const __DEV__ = process.env.NODE_ENV === "development";

const POSTS_DIR = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "data",
  "src",
);

const prettyCodeOptions: Options = {
  theme: "github-dark-default",
  keepBackground: false,
  tokensMap: {
    fn: "entity.name.function",
  },
};

export async function getMDXData(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);

  try {
    await fs.access(filePath); // Check if file exists
  } catch {
    return null;
  }

  try {
    const source = await fs.readFile(filePath, "utf8");

    const compiled = String(
      await compile(source, {
        outputFormat: "function-body",
        jsxImportSource: "react",
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "metadata" }],
        ],
        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
      }),
    );

    const mdxFile = await evalMdx(compiled);
    const headings = getHeadings(source);

    return Object.assign(mdxFile, { headings });
  } catch (err) {
    console.error(`Failed to load MDX file: ${filePath}`, err);
    return null;
  }
}

export async function getPosts(): Promise<MDXFileMeta[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch (err) {
    console.error(`Failed to read posts directory: ${POSTS_DIR}`, err);
    return [];
  }

  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      try {
        const mdxData = await getMDXData(slug);
        if (!mdxData || !mdxData.metadata) return null;

        return {
          slug,
          ...mdxData.metadata,
        };
      } catch (err) {
        console.error(`Failed to process MDX file: ${file}`, err);
        return null;
      }
    }),
  );

  const validPosts = posts.filter((post) =>
    __DEV__ ? post !== null : post !== null && !post.draft,
  ) as MDXFileMeta[];
  return validPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

// Helper: turn compiled MDX into a renderable React component + metadata
export function evalMdx(code: string): Promise<MDXFile> {
  const fn = new Function(code as unknown as string); // creates the MDX function
  return fn(runtime);
}

export const getHeadings = (content: string): MDXHeader[] => {
  const headings = content.match(/^#+\s.+/gm);

  if (!headings) return [];

  const toc = headings.map((h) => {
    const match = h.match(/^#+/);
    const level = match ? match[0].length : 0;
    const title = h.replace(/^#+\s/, "");
    const id = headingToRoute(title);
    return { level, title, id };
  });

  return toc;
};

export function headingToRoute(header: string): string {
  return header
    .replace(/^#+\s*/, "")
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
