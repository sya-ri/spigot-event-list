import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchJson, HttpError } from "./fetch-json";

test("returns successful JSON and surfaces HTTP failures before parsing plain text", async (context) => {
  context.mock.method(
    globalThis,
    "fetch",
    async () => new Response('{"events":[]}'),
  );
  assert.deepEqual(await fetchJson("/events"), { events: [] });
  for (const status of [400, 404, 500]) {
    context.mock.method(
      globalThis,
      "fetch",
      async () => new Response("not JSON", { status }),
    );
    await assert.rejects(
      fetchJson("/events"),
      (error) => error instanceof HttpError && error.status === status,
    );
  }
});
test("propagates network errors and invalid successful JSON", async (context) => {
  context.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("offline");
  });
  await assert.rejects(fetchJson("/events"), /offline/);
  context.mock.method(globalThis, "fetch", async () => new Response("invalid"));
  await assert.rejects(fetchJson("/events"), SyntaxError);
});
