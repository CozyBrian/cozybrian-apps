import { describe, expect, test } from "bun:test";

import { getHeadings, headingToRoute } from "./headings";

describe("blog headings", () => {
  test("extracts headings with their levels and anchors", () => {
    expect(
      getHeadings("# Title\n\nText\n## Hello, World!\n### Details"),
    ).toEqual([
      { level: 1, title: "Title", id: "title" },
      { level: 2, title: "Hello, World!", id: "hello-world" },
      { level: 3, title: "Details", id: "details" },
    ]);
  });

  test("handles empty content", () => {
    expect(getHeadings("")).toEqual([]);
  });

  test("normalizes punctuation, spacing, and repeated hyphens", () => {
    expect(headingToRoute("## Hello,   World! -- ")).toBe("hello-world");
  });
});
