import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "cozybrian-web",
    domains: ["cozybrian.dev", "www.cozybrian.dev"],
    workersDev: true,
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-16",
    compatibilityFlags: ["nodejs_compat"],
    observability: {
      enabled: true,
      traces: { enabled: true, headSamplingRate: 0.1 },
    },
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      VINEXT_KV_CACHE: bindings.kv(),
      BETTER_AUTH_SECRET: bindings.secret(),
      BETTER_AUTH_URL: bindings.text("https://www.cozybrian.dev"),
    },
  }),
});
