import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchMavenVersions, fetchMavenSnapshot, fetchPomVersion } from "./maven-metadata.ts";

const url = "https://example.test/maven-metadata.xml";

test("reads only the versions in the release list and preserves the snapshot suffix", async (context) => {
  context.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        "<metadata><version>ignore</version><versioning><versions><version> 1.0 </version><version>1.1</version></versions><snapshot><timestamp>20261124.101010</timestamp><buildNumber>03</buildNumber></snapshot></versioning></metadata>",
      ),
  );
  assert.deepEqual(await fetchMavenVersions(url), ["1.0", "1.1"]);
  assert.deepEqual(await fetchMavenSnapshot(url), {
    snapshotVersion: "20261124.101010-03",
    buildNumber: 3,
  });
});

test("reads the project version from a namespaced POM or inherits the parent's version", async (context) => {
  for (const [version, expected] of [
    ["<version> 2.1 </version>", "2.1"],
    ["", "2.0"],
  ]) {
    context.mock.method(
      globalThis,
      "fetch",
      async () =>
        new Response(
          `<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><parent><version>2.0</version></parent>${version}<dependencies><dependency><version>4.0</version></dependency></dependencies></project>`,
        ),
    );
    assert.equal(await fetchPomVersion(url), expected);
  }
});
