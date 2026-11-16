# Cloudflare hosting

Both apps use vinext on Cloudflare Workers alongside the existing Next.js setup.
The Vite/Cloudflare integration currently includes beta packages; keep `bun.lock`
committed and test upgrades before deploying.

| App  | Custom domains                                   | Worker fallback URL                              |
| ---- | ------------------------------------------------ | ------------------------------------------------ |
| Web  | https://www.cozybrian.dev, https://cozybrian.dev | https://cozybrian-web.dragonbrian33.workers.dev  |
| Blog | https://blog.cozybrian.dev                       | https://cozybrian-blog.dragonbrian33.workers.dev |

## Deploy from the repository root

Use Node >=22.12 and Bun. The root Vite 8 dependency ensures hoisted vinext uses
the correct Vite version; the admin app retains its own Vite 6 dependency.

```sh
bun install --frozen-lockfile
bun run --cwd apps/web cf auth login
bun run deploy-web:cloudflare
bun run deploy-blog:cloudflare
```

For CLI commands, use `bunx cf ...` from either app directory (the `cf auth login`
example above can instead be run there). The root deploy scripts build shared
Tailwind packages through Turborepo before building and uploading each Worker.
CI requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` for the target
account. Build Output and generated types live in each app's ignored `.cloudflare/`.

Cloudflare automatically provisions a separate `VINEXT_KV_CACHE` namespace for
each Worker. Static HTML/RSC is generated at build time. Changes to posts or
static pages require redeploying both apps; runtime invalidation does not update
these snapshots. API handlers still run on Workers. Images are served without
runtime optimization. Logs are enabled; traces sample 10% of requests.

## Configuration and secrets

- `NEXT_PUBLIC_BLOG_URL` controls web-to-blog links at build time.
- `NEXT_PUBLIC_HOME_URL` controls blog-to-web links at build time.
- Vite defaults these to `https://blog.cozybrian.dev` and `https://www.cozybrian.dev`; environment variables or app
  `.env.production.local` files override them. Never put secrets in public variables.
- `BETTER_AUTH_URL` is a runtime binding in `apps/web/cloudflare.config.ts`.
- `BETTER_AUTH_SECRET` is stored as a Cloudflare secret, not committed. The first
  deployment initialized a random secret. Subsequent deploys preserve it.
- No local Resend key was available. Email sending has not been configured or
  tested on Cloudflare. If needed, upload `RESEND_API_KEY` as a Worker secret.
- Existing Better Auth configuration uses `memoryAdapter({})`; it does not
  provide durable accounts or sessions across Worker instances. This migration
  intentionally does not redesign auth or storage.
- Vercel Analytics remains in the app but does not collect by default off Vercel.

For a fresh Worker, securely prepare a JSON secrets file containing
`BETTER_AUTH_SECRET`, then deploy the built web app with:

```sh
bun run build-web:cloudflare
# Run from apps/web, substituting your private secrets-file path:
bunx cf deploy --prebuilt --mode production --secrets-file /path/to/secrets.json
```

Do not commit the secrets file. Delete it securely after uploading.

## Content and compatibility

`packages/blog/src/cloudflare.ts` is the Vite-only replacement for `@cozy/blog`.
It imports precompiled MDX and build-time heading data, avoiding runtime filesystem
access and `new Function`. The normal package entry remains available to Next.js.
React/React DOM/RSC are aligned at 19.3.1, required by this vinext version.

Header SVG logos explicitly use `unoptimized` on `next/image`. Vite may inline
these imports as data URLs, which must not go through vinext's `/_next/image`
endpoint (it rejects them with HTTP 400). When smoke-testing images, check the
rendered `<img src>` URLs, not only the JavaScript/CSS assets.

```sh
bun run build-web:cloudflare
bun run build-blog:cloudflare
bun run --cwd apps/web check-types
bun run --cwd apps/blog check-types
bun test packages/blog/src/headings.test.ts
```

Inspect build logs for prerender errors even when the command exits successfully.
The app type-check scripts run `next typegen` first to refresh `.next/types` after
switching between vinext and Next.js, preventing stale route type export errors.
For local previews, run `bun run start:vinext` in one app at a time: the Cloudflare
inspector otherwise uses the same default port in both processes.

## Custom domains

On 2026-11-16, with user approval, the root and `www` hostnames were moved to
`cozybrian-web`, and `blog.cozybrian.dev` to `cozybrian-blog`. The three matching
Vercel A/CNAME records were replaced by Cloudflare-managed Worker records.
All ten unrelated DNS records, including email, admin, dev, and finance, were
verified unchanged. Cloudflare manages HTTPS certificates for these domains.

`www.cozybrian.dev` remains the web app's primary metadata/cross-link/auth URL;
the root also serves the web app directly (no new redirect). Both apps declare
their domains in `cloudflare.config.ts`, and `workersDev: true` preserves fallback
URLs. Article Open Graph URLs now use `.dev` instead of stale `.com` hostnames.

A pre-cutover DNS snapshot is saved locally at
`/private/var/folders/y3/pzrnj6s135z42bsjj6xh6gj80000gn/T/opencode/cozybrian-dns-before-cutover.json`.
For rollback, coordinate detaching the three Worker domains before restoring
only their original website records from the snapshot; leave email and unrelated
hostnames alone. The snapshot is local, not a durable backup or committed secret.

The original `dev`, `build`, and `start` scripts still use Next.js.
