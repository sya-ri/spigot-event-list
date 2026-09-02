import assert from "node:assert/strict";
import { test } from "node:test";
import {
  getLatestMinecraftVersionFromVersions,
  resolveServerVersion,
} from "./data-paths";

test("derives the latest Minecraft version only when every server source agrees", () => {
  assert.equal(
    getLatestMinecraftVersionFromVersions({
      Paper: "26.2 - #121",
      Purpur: "26.2 - #2632",
      Spigot: "26.2 - #12",
    }),
    "26.2",
  );
  assert.equal(
    getLatestMinecraftVersionFromVersions({
      Paper: "26.3 - #1",
      Purpur: "26.2 - #2632",
      Spigot: "26.2 - #12",
    }),
    null,
  );
  assert.equal(
    getLatestMinecraftVersionFromVersions({
      Paper: "26.2 - #121",
      Spigot: "26.2 - #12",
    }),
    null,
  );
});

test("an explicit latest version stops resolving to latest after latest advances", () => {
  assert.deepEqual(resolveServerVersion("26.2", ["26.1.2"], "26.2"), {
    requestedVersion: "26.2",
    resolvedVersion: "latest",
  });

  assert.equal(resolveServerVersion("26.2", ["26.1.2"], "26.3"), null);
  assert.deepEqual(resolveServerVersion("26.2", ["26.2", "26.1.2"], "26.3"), {
    requestedVersion: "26.2",
    resolvedVersion: "26.2",
  });
});
