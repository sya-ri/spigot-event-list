import assert from "node:assert/strict";
import { test } from "node:test";
import { getSources } from "./sources";

test("resolves only requested proxy metadata without depending on server endpoints", async (context) => {
  const urls: string[] = [];
  context.mock.method(globalThis, "fetch", async (input: string) => {
    urls.push(input);
    if (input.endsWith("/pom.xml"))
      return new Response("<project><version>1.0-SNAPSHOT</version></project>");
    if (input.includes("BungeeCord/lastBuild"))
      return Response.json({ id: "1" });
    if (input.endsWith("/projects/velocity"))
      return Response.json({ versions: { "3": ["3.4.0-SNAPSHOT"] } });
    if (input.endsWith("/projects/velocity/versions/3.4.0-SNAPSHOT"))
      return Response.json({ builds: [2] });
    throw new Error(`Unexpected metadata request: ${input}`);
  });
  const result = await getSources(["Bungee", "Velocity"]);
  assert.deepEqual(Object.keys(result), ["Bungee", "Velocity"]);
  assert.equal(result.Bungee.buildNumber, 1);
  assert.equal(result.Velocity.buildNumber, 2);
  assert.equal(urls.length, 4);
});

test("requesting no sources performs no remote calls", async (context) => {
  context.mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected fetch");
  });
  assert.deepEqual(await getSources([]), {});
});
