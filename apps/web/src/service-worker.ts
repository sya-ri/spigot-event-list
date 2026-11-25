/// <reference lib="webworker" />
declare const cacheId: string;
declare const precacheUrls: string[];
const service = globalThis as unknown as ServiceWorkerGlobalScope;
const apiCache = cacheId + "-api";

service.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheId).then((cache) => cache.addAll(precacheUrls)));
});
service.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) {
        if (key.startsWith("events-") && key !== cacheId && key !== apiCache)
          await caches.delete(key);
      }
      await service.clients.claim();
    })(),
  );
});
service.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== service.location.origin) return;
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(apiCache);
        try {
          const response = await fetch(req);
          if (response.ok) {
            await cache.put(req, response.clone());
            const keys = await cache.keys();
            for (const key of keys.slice(0, Math.max(0, keys.length - 32))) await cache.delete(key);
          }
          return response;
        } catch (error) {
          const previous = await cache.match(req);
          if (previous) return previous;
          throw error;
        }
      })(),
    );
  } else if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(async (error) => {
        const locale =
          url.pathname === "/"
            ? service.navigator.language.startsWith("ja")
              ? "/ja"
              : "/en"
            : url.pathname.replace(/\/$/, "");
        const offline = await (await caches.open(cacheId)).match(locale);
        if (offline) return offline;
        throw error;
      }),
    );
  } else if (precacheUrls.includes(url.pathname)) {
    event.respondWith(
      caches.open(cacheId).then(async (cache) => (await cache.match(url.pathname)) ?? fetch(req)),
    );
  }
});
