import assert from "node:assert/strict";
import { test } from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type MultiProgress from "multi-progress";
import { downloadArtifact } from "./maven";

const artifact = { groupId: "example", artifactId: "api", version: "1.0" };
const progress = {
  newBar: () => ({ tick: () => {} }),
} as unknown as MultiProgress;

test("waits for the complete output file, with and without Content-Length", async (context) => {
  const directory = await mkdtemp(path.join(tmpdir(), "event-download-"));
  context.after(() => rm(directory, { recursive: true, force: true }));
  const body = Buffer.alloc(1024 * 1024, 42);
  for (const withLength of [true, false]) {
    context.mock.method(
      globalThis,
      "fetch",
      async () =>
        new Response(body, {
          headers: withLength ? { "content-length": String(body.length) } : {},
        }),
    );
    const destination = path.join(directory, String(withLength) + ".jar");
    await downloadArtifact(
      progress,
      "Test",
      artifact,
      destination,
      "https://example.test/",
    );
    assert.deepEqual(await readFile(destination), body);
  }
});
test("rejects destination write errors with their original cause", async (context) => {
  const directory = await mkdtemp(path.join(tmpdir(), "event-download-"));
  context.after(() => rm(directory, { recursive: true, force: true }));
  context.mock.method(
    globalThis,
    "fetch",
    async () => new Response("archive", { headers: { "content-length": "7" } }),
  );
  await assert.rejects(
    downloadArtifact(
      progress,
      "Test",
      artifact,
      path.join(directory, "missing", "a.jar"),
      "https://example.test/",
    ),
    { code: "ENOENT" },
  );
});
test("rejects an interrupted response instead of proceeding to extraction", async (context) => {
  const directory = await mkdtemp(path.join(tmpdir(), "event-download-"));
  context.after(() => rm(directory, { recursive: true, force: true }));
  context.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            controller.error(new Error("interrupted"));
          },
        }),
        { headers: { "content-length": "100" } },
      ),
  );
  await assert.rejects(
    downloadArtifact(
      progress,
      "Test",
      artifact,
      path.join(directory, "a.jar"),
      "https://example.test/",
    ),
    /interrupted/,
  );
});
