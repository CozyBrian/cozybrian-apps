/// <reference types="vite/client" />

import type { MDXFile, MDXFileMeta, MDXHeader } from "./types";

// Vite compiles MDX at build time: Workers need neither a filesystem nor eval.
const posts = import.meta.glob<MDXFile & { headings: MDXHeader[] }>(
  "./content/*.mdx",
  { eager: true },
);

export async function getMDXData(
  slug: string,
): Promise<(MDXFile & { headings: MDXHeader[] }) | null> {
  const key = `./content/${slug}.mdx`;
  const post = posts[key];
  if (!post) return null;

  return post;
}

export async function getPosts(): Promise<MDXFileMeta[]> {
  return Object.entries(posts)
    .filter(([, post]) => import.meta.env.DEV || !post.metadata.draft)
    .map(([key, post]) => ({
      ...post.metadata,
      slug: key.replace("./content/", "").replace(/\.mdx$/, ""),
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export * from "./headings";
export * from "./types";
export * from "./components";
export * from "./mdx-components";
export * from "./og-image";
