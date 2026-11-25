import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { publishCatalog } from "@spigot-event-list/catalog/publish";
import { createRouter } from "@spigot-event-list/api/router";
import { catalog, dataRoot } from "./src/lib/catalog";
import { buildServiceWorker } from "./scripts/build-service-worker";

export default defineConfig({
  site: "https://spigot-event-list.s7a.dev",
  devToolbar: { enabled: false },
  integrations: [
    react(),
    {
      name: "event-catalog",
      hooks: {
        "astro:server:setup": ({ server }) => {
          const route = createRouter(catalog);
          server.middlewares.use(async (req, res, next) => {
            if (!req.url) return next();
            const origin = new URL("http://localhost");
            origin.host = req.headers.host ?? origin.host;
            const url = new URL(req.url, origin);
            if (url.pathname !== "/" && !url.pathname.startsWith("/api/")) return next();
            try {
              const headers = new Headers();
              for (const key of ["cookie", "accept-language"])
                if (req.headers[key]) headers.set(key, String(req.headers[key]));
              const result = await route(new Request(url, { method: req.method, headers }));
              if (!result) return next();
              res.writeHead(result.status, Object.fromEntries(result.headers));
              res.end(await result.text());
            } catch (error) {
              next(error);
            }
          });
        },
        "astro:build:done": async ({ dir }) => {
          const output = fileURLToPath(dir);
          await publishCatalog(dataRoot, join(output, "_catalog"));
          await buildServiceWorker(output);
        },
      },
    },
  ],
});
