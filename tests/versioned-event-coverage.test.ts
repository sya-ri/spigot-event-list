import assert from "node:assert/strict";
import { test } from "node:test";
import path from "node:path";
import { NextRequest } from "next/server";
import { createDataPaths } from "../src/libs/data-paths";
import { createSearchEventsHandler } from "../src/app/api/search/events/handler";

for (const version of ["26.2", "26.3"]) {
  test(`fixed ${version} events remain searchable when latest sources disagree`, async () => {
    const data = createDataPaths(path.join(process.cwd(), "data"));
    assert.ok((await data.getServerVersionsDesc()).includes(version));
    const handler = createSearchEventsHandler({
      ...data,
      getLatestMinecraftVersion: async () => null,
      readLatestServerEvents: async () => {
        throw new Error("Must read the exact snapshot");
      },
    });
    for (const [source, name] of [
      ["spigot", "PlayerInteractEvent"],
      ["paper", "PlayerArmSwingEvent"],
      ["purpur", "PlayerAFKEvent"],
    ]) {
      const response = await handler(
        new NextRequest(
          `https://example.test/api/search/events?q=${name}&version=${version}&source=${source}&lang=en`,
        ),
      );
      assert.equal(response.status, 200);
      const result = await response.json();
      assert.equal(result.version, version);
      assert.equal(result.total, 1);
      assert.equal(result.events[0].name, name);
      assert.equal(result.events[0].version, version);
      assert.ok(result.events[0].link.includes(`/${source}/${version}/`));
    }
  });
}
