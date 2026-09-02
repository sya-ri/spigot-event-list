import assert from "node:assert/strict";
import { test } from "node:test";
import { createVersionsHandler } from "./handler";

test("lists the current latest Minecraft version as an explicit alias", async () => {
  const response = await createVersionsHandler({
    getLatestMinecraftVersion: async () => "26.2",
    getServerVersionsDesc: async () => ["26.1.2", "1.21.11"],
  })();

  assert.deepEqual(await response.json(), {
    latest: "latest",
    latestMinecraftVersion: "26.2",
    versions: ["latest", "26.2", "26.1.2", "1.21.11"],
  });
});

test("does not advertise an explicit alias when latest server sources disagree", async () => {
  const response = await createVersionsHandler({
    getLatestMinecraftVersion: async () => null,
    getServerVersionsDesc: async () => ["26.1.2", "1.21.11"],
  })();

  assert.deepEqual(await response.json(), {
    latest: "latest",
    latestMinecraftVersion: null,
    versions: ["latest", "26.1.2", "1.21.11"],
  });
});
