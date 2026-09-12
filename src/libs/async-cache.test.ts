import assert from "node:assert/strict";
import { test } from "node:test";
import { createAsyncCache } from "./async-cache";

test("coalesces in-flight reads and reloads only after expiry", async () => {
  let now = 0,
    calls = 0;
  const cache = createAsyncCache(60, 2, () => now);
  const load = async () => ++calls;
  const first = cache("a", load);
  assert.equal(cache("a", load), first);
  assert.equal(await first, 1);
  now = 59;
  assert.equal(await cache("a", load), 1);
  now = 60;
  assert.equal(await cache("a", load), 2);
});
test("failed loads are evicted and retried", async () => {
  const cache = createAsyncCache(60);
  await assert.rejects(
    cache("a", async () => {
      throw new Error("temporary failure");
    }),
  );
  assert.equal(await cache("a", async () => "recovered"), "recovered");
});
test("evicts the least recently used entry at the memory bound", async () => {
  const cache = createAsyncCache(60_000, 2);
  let calls = 0;
  const load = async () => ++calls;
  await cache("a", load);
  await cache("b", load);
  await cache("a", load);
  await cache("c", load);
  assert.equal(await cache("a", load), 1);
  assert.equal(await cache("b", load), 4);
});
test("an old rejected load cannot remove its replacement", async () => {
  const cache = createAsyncCache(60_000, 1);
  let fail!: (error: Error) => void;
  const old = cache(
    "a",
    () =>
      new Promise<never>((_, reject) => {
        fail = reject;
      }),
  );
  await cache("b", async () => "b");
  await cache("a", async () => "new");
  fail(new Error("old"));
  await assert.rejects(old);
  assert.equal(await cache("a", async () => "incorrect reload"), "new");
});
test("disabled caching reads fresh data for downloader callers", async () => {
  const cache = createAsyncCache(0);
  let value = 1;
  assert.equal(await cache("a", async () => value), 1);
  value = 2;
  assert.equal(await cache("a", async () => value), 2);
});
