import { bindings, defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    name: "spigot-event-list",
    entrypoint: "./src/index.ts",
    compatibilityDate: "2026-11-01",
    assets: {
      htmlHandling: "drop-trailing-slash",
      notFoundHandling: "404-page",
      runWorkerFirst: ["/", "/api/*"],
    },
    env: { ASSETS: bindings.assets() },
  },
});
