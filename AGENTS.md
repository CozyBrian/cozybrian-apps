# Agents Guide

This repository is a Bun + Turborepo monorepo with Next.js apps, a Vite app,
and shared packages. Use the notes below when running tasks or making changes.

## Quick Facts

- Package manager: Bun (see `package.json#packageManager`)
- Node version: >=18
- Workspaces: `apps/*`, `packages/*`
- Task runner: Turborepo (`turbo.json`)
- Linting: ESLint (flat config, shared rules in `packages/eslint-config`)
- Formatting: Prettier (via ESLint plugin)
- Type checking: TypeScript (shared configs in `packages/typescript-config`)

## Commands (Repo Root)

Use Bun at the repo root unless a command is explicitly app-specific.

- Install: `bun install`
- Build all: `bun run build`
- Lint all: `bun run lint`
- Lint all (fix): `bun run lint:fix`
- Type check all: `bun run check-types`
- Dev all (persistent): `bun run dev`

## App/Package Commands

Run these from the repo root with `turbo` or from the package folder with `bun`.

### Web app (Next.js)

- Dev: `bun run dev-web` (or `bun --cwd apps/web run dev`)
- Build: `bun run build-web` (or `bun --cwd apps/web run build`)
- Start: `bun run start-web` (or `bun --cwd apps/web run start`)
- Lint: `bun --cwd apps/web run lint`
- Lint (fix): `bun --cwd apps/web run lint:fix`
- Type check: `bun --cwd apps/web run check-types`

### Blog app (Next.js)

- Dev: `bun run dev-blog` (or `bun --cwd apps/blog run dev`)
- Build: `bun run build-blog` (or `bun --cwd apps/blog run build`)
- Start: `bun run start-blog` (or `bun --cwd apps/blog run start`)
- Lint: `bun --cwd apps/blog run lint`
- Lint (fix): `bun --cwd apps/blog run lint:fix`
- Type check: `bun --cwd apps/blog run check-types`

### Admin app (Vite)

- Dev: `bun --cwd apps/admin run dev`
- Build: `bun --cwd apps/admin run build`
- Preview: `bun --cwd apps/admin run start`
- Lint: `bun --cwd apps/admin run lint`
- Lint (fix): `bun --cwd apps/admin run lint:fix`

### UI package

- Build (Tailwind): `bun --cwd packages/ui run build`
- Dev (watch): `bun --cwd packages/ui run dev`
- Lint: `bun --cwd packages/ui run lint`
- Lint (fix): `bun --cwd packages/ui run lint:fix`
- Type check: `bun --cwd packages/ui run type-check`

### Styling package

- Build (Tailwind): `bun --cwd packages/styling run build`
- Dev (watch): `bun --cwd packages/styling run dev`
- Lint: `bun --cwd packages/styling run lint`
- Type check: `bun --cwd packages/styling run type-check`

### Database package (Prisma)

- Generate client: `bun --cwd packages/database run db:generate`
- Migrate (dev): `bun --cwd packages/database run db:migrate`
- Deploy (prod): `bun --cwd packages/database run db:deploy`

## Running a Single Test

There is no test runner configured in this repo and no `*.test.*` files were
found. If you add a test framework (Vitest/Jest/Playwright), update this file
with the exact single-test commands.

## Environment Variables

Turborepo build tasks use these env vars (see `turbo.json`):

- `DATABASE_URL`, `DIRECT_URL`
- `RESEND_API_KEY`
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `VITE_BETTER_AUTH_URL`
- `NEXT_PUBLIC_BLOG_URL`, `NEXT_PUBLIC_HOME_URL`
- `NODE_ENV`

## Code Style Guidelines

These rules come from the shared ESLint configs in `packages/eslint-config`.

### Imports

- Order enforced by `import/order`:
  1. builtin
  2. external
  3. internal
  4. parent/sibling/index
  5. type
  6. object
- Always include a blank line between import groups.
- Alphabetize within groups (case-insensitive).
- Type-only imports should use `import type` when applicable.
- Path aliases:
  - `apps/web` and `apps/blog` use `@/*` for `src/*`.
  - `packages/ui` uses `@cozy/ui/*`, `@cozy/ui/lib/*`, `@cozy/ui/utils/*`,
    `@cozy/ui/hooks/*`.

### Formatting

- Formatting is enforced by Prettier via ESLint (`prettier/prettier` rule).
- Run `bun run lint:fix` or `bun run format` at repo root for auto-formatting.
- Keep files ASCII unless the existing file already uses non-ASCII.

### TypeScript

- Strict mode is enabled (`strict: true`).
- `noUncheckedIndexedAccess: true` is enabled; handle possibly `undefined`.
- `isolatedModules: true` and `moduleResolution: NodeNext` in base config.
- Prefer explicit return types for exported functions when non-obvious.
- Avoid `any`; use `unknown` and narrow when needed.

### React/Next.js

- React hooks rules are enabled; follow the rules of hooks.
- React version is auto-detected in ESLint configs.
- New JSX transform is used (no `React` import required for JSX).
- Next.js apps use the shared `@repo/eslint-config/next-js` config.

### Naming

- Use `camelCase` for variables/functions.
- Use `PascalCase` for components, classes, and types.
- Use `UPPER_SNAKE_CASE` for constants that are truly constant.
- File names should match the framework conventions already in use.

### Error Handling

- Validate inputs at module boundaries (API handlers, forms, DB access).
- Prefer early returns and explicit error messages.
- When catching errors, preserve the original error details if rethrowing.
- Avoid swallowing errors; log or surface them appropriately.

### Lint Rules Highlights

- Unused imports are errors (`unused-imports/no-unused-imports`).
- Unused variables are warnings unless prefixed with `_`.
- Prettier differences are errors.
- `turbo/no-undeclared-env-vars` warns on missing env declarations.

## Cursor / Copilot Rules

No Cursor or Copilot rule files were found in this repo:

- `.cursor/rules/` or `.cursorrules`: not present
- `.github/copilot-instructions.md`: not present

## Repo Conventions to Keep

- Use Turborepo scripts from the root when possible.
- Keep shared ESLint/TS configs centralized in `packages/*`.
- Avoid adding project-specific lint rules unless necessary.
- If you add tests, update the "Running a Single Test" section.
