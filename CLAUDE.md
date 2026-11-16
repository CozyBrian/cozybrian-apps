# Codebase Index

This project has a local, gitignored `docs/` index: architecture, implementation,
patterns, decisions, and changelog. The tracked repository guide is `AGENTS.md`.

## Session Start

- Read `docs/architecture.md` and `docs/implementation.md` first when present.
- Before searching, ask whether the information is already indexed.
- Use targeted searches for source details absent from the docs; avoid broad rescans.
- Do not invoke the indexer unless creating or maintaining the index.

## After Features or Fixes

- Inspect changed files and direct dependencies only.
- Update the affected index sections without replacing unrelated content.
- Add an architectural decision only when the change involves a meaningful choice.
- Append a dated changelog entry.
- If delegation is explicitly authorized, tell child agents to read the index first.
