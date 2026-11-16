import type { MDXHeader } from "./types";

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

export function getHeadings(content: string): MDXHeader[] {
  return (content.match(/^#+\s.+/gm) ?? []).map((heading) => ({
    level: heading.match(/^#+/)?.[0].length ?? 0,
    title: heading.replace(/^#+\s/, ""),
    id: headingToRoute(heading),
  }));
}
