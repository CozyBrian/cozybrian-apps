#!/usr/bin/env node
/**
 * traverse.js  ──  Export your repo tree (minus .git-ignored files)
 *
 * USAGE
 *   node traverse.js [rootDir]    # defaults to CWD
 *
 * OUTPUT
 *   structure.json  – hierarchical JSON an AI can ingest
 */

import { promises as fs } from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);          // ESM-friendly require
const ignore = require("ignore");                        // 1 kB Git-ignore parser

// ──────────────────────────────────────────────────────────── helpers
async function loadGitIgnore(root) {
  const ig = ignore();
  try {
    const txt = await fs.readFile(path.join(root, ".gitignore"), "utf8");
    ig.add(txt.split(/\r?\n/));
  } catch (_) {
    /* no .gitignore found – ignore nothing extra */
  }
  ig.add(".git");                                        // always skip .git/ internals
  return ig;
}

async function walk(dir, ig, root) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });

  return Promise.all(
    dirents.map(async (d) => {
      const full = path.join(dir, d.name);
      const rel  = path.relative(root, full);

      if (ig.ignores(rel)) return null;                  // Git says: “skip it”

      if (d.isDirectory()) {
        return {
          name: d.name,
          type: "directory",
          children: await walk(full, ig, root),
        };
      }

      const { size, mtimeMs } = await fs.stat(full);
      return { name: d.name, type: "file", size, mtimeMs };
    }),
  ).then((list) => list.filter(Boolean));                // remove nulls
}

// ──────────────────────────────────────────────────────────── main
async function main() {
  const root = path.resolve(process.argv[2] ?? ".");
  const ig   = await loadGitIgnore(root);

  const tree = {
    name: path.basename(root),
    type: "directory",
    children: await walk(root, ig, root),
  };

  await fs.writeFile(
    path.join(root, "structure.json"),
    JSON.stringify(tree, null, 2),
  );

  console.log(`\n✓ Repo structure saved to ${path.resolve("structure.json")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});