import assert from "node:assert/strict";
import { test } from "node:test";
import { createRouter } from "./router.ts";
import { assetCatalog, type Assets } from "./assets.ts";

const loads = new Map<string, number>();
const assets: Assets = {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    assert.equal(new URL(request.url).origin, "https://example.com");
    loads.set(path, (loads.get(path) ?? 0) + 1);
    if (path === "/_catalog/manifest.json")
      return Response.json({ latest: null, versions: ["1.0"] });
    if (path === "/_catalog/latest.json") return Response.json({ lang: ["en", "ja"], events: [] });
    return new Response(null, { status: 404 });
  },
};
const route = createRouter(assetCatalog(assets, "https://example.com"));
test("negotiates the root language and keeps shared search parameters", async () => {
  for (const [headers, expected] of [
    [{ "accept-language": "ja-JP;q=0.9,en;q=0.3" }, "ja"],
    [{ "accept-language": "ja", cookie: "NEXT_LOCALE=en" }, "en"],
    [{ "accept-language": "fr,de" }, "en"],
  ] as const) {
    const result = await route(
      new Request("https://example.com/?search=chat&version=latest", {
        headers: new Headers(Object.entries(headers)),
      }),
    );
    assert.equal(result?.status, 307);
    assert.equal(
      result.headers.get("Location"),
      "https://example.com/" + expected + "?search=chat&version=latest",
    );
    assert.match(result.headers.get("Vary") ?? "", /Cookie/);
  }
});
test("serves the search API from bound assets and delegates site routes", async () => {
  const url = "https://example.com/api/search/events?lang=en";
  const response = await route(new Request(url));
  assert.equal(response?.status, 200);
  assert.equal((await response.json()).total, 0);
  const head = await route(new Request(url, { method: "HEAD" }));
  assert.equal(head?.status, 200);
  assert.equal(await head.text(), "");
  assert.equal(loads.get("/_catalog/latest.json"), 1);
  assert.equal((await route(new Request(url, { method: "POST" })))?.status, 405);
  assert.equal((await route(new Request("https://example.com/api/missing")))?.status, 404);
  assert.equal(await route(new Request("https://example.com/ja")), undefined);
});
