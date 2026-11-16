import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "cozybrian-blog",
    domains: ["blog.cozybrian.dev"],
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
    },
  }),
});
