import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { createDataPaths } from "../../../src/libs/data-paths";
import { retainCompleteServerSnapshot } from "./retain-server-snapshot";
import type EventType from "./types/event-type";

const snapshot = {
  lang: ["en", "ja"],
  events: [],
  versions: {
    Paper: "26.2 - #121",
    Spigot: "26.2 - #12",
    Purpur: "26.2 - #2633",
  },
};

test("retains a complete exact snapshot after latest sources advance independently", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "event-snapshot-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await retainCompleteServerSnapshot(root, snapshot);
  const retained = await readFile(
    path.join(root, "minecraft/26.2/events.json"),
    "utf8",
  );
  const mixed = {
    ...snapshot,
    versions: {
      ...snapshot.versions,
      Paper: "26.3 - #142",
      Spigot: "26.3 - #7",
    },
  };
  await retainCompleteServerSnapshot(root, mixed);
  await writeFile(
    path.join(root, "versions.json"),
    JSON.stringify(mixed.versions),
  );
  const data = createDataPaths(root);
  assert.equal(await data.getLatestMinecraftVersion(), null);
  assert.deepEqual(await data.getServerVersionsDesc(), ["26.2"]);
  assert.equal(
    await readFile(path.join(root, "minecraft/26.2/events.json"), "utf8"),
    retained,
  );
  assert.deepEqual(await data.readServerEvents("26.2"), {
    lang: snapshot.lang,
    events: snapshot.events,
  });
  assert.deepEqual(await data.readServerVersions("26.2"), snapshot.versions);
});

test("does not turn incomplete or mixed latest sources into a fixed version", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "event-snapshot-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  for (const versions of [
    { Paper: "26.3 - #142", Spigot: "26.3 - #7" },
    { ...snapshot.versions, Paper: "26.3 - #142" },
  ]) {
    await retainCompleteServerSnapshot(root, { ...snapshot, versions });
  }
  await assert.rejects(
    readFile(path.join(root, "minecraft/26.3/events.json")),
    { code: "ENOENT" },
  );
  await assert.rejects(
    readFile(path.join(root, "minecraft/26.2/events.json")),
    { code: "ENOENT" },
  );
});

test("preserves reviewed fixed-version metadata when the Javadoc evidence is unchanged", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "event-snapshot-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const event: EventType = {
    name: "ExampleEvent",
    source: "paper",
    href: "ExampleEvent.html",
    link: "https://example.test/latest/ExampleEvent.html",
    javadoc: "Explicit event documentation.",
    description: { en: "Reviewed description.", ja: "確認済みの説明。" },
    keywords: { en: ["reviewed"], ja: ["確認済み"] },
  };
  await retainCompleteServerSnapshot(root, { ...snapshot, events: [event] });
  await retainCompleteServerSnapshot(root, {
    ...snapshot,
    events: [
      {
        ...event,
        description: { en: "Generated description.", ja: "" },
        keywords: undefined,
      },
    ],
  });
  const data = await createDataPaths(root).readServerEvents("26.2");
  assert.deepEqual(data.events[0].description, event.description);
  assert.deepEqual(data.events[0].keywords, event.keywords);
  assert.equal(
    data.events[0].link,
    "https://spigot-javadoc.s7a.dev/paper/26.2/ExampleEvent.html",
  );
});

test("retains verified official references instead of rewriting them to unpublished mirrors", async (t) => {
  const root = await mkdtemp(
    path.join(os.tmpdir(), "event-official-reference-"),
  );
  t.after(() => rm(root, { recursive: true, force: true }));
  const event: EventType = {
    name: "ExampleEvent",
    source: "paper",
    href: "ExampleEvent.html",
    link: "https://jd.papermc.io/paper/26.3/ExampleEvent.html",
    description: { en: "Reviewed description.", ja: "確認済みの説明。" },
  };
  await retainCompleteServerSnapshot(root, {
    ...snapshot,
    versions: {
      Paper: "26.3 - #142",
      Spigot: "26.3 - #7",
      Purpur: "26.3 - #2642",
    },
    events: [event],
    linkBaseBySourceType: { paper: "https://jd.papermc.io/paper/26.3/" },
  });
  const data = await createDataPaths(root).readServerEvents("26.3");
  assert.equal(data.events[0].link, event.link);
});
