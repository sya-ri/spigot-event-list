import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import EventType from "../../../../../packages/downloader/src/types/event-type";
import { createSearchEventsHandler } from "./handler";

const paperEvent: EventType = {
  description: {
    en: "Called when a player joins the server.",
    ja: "プレイヤーがサーバーに参加した時に呼び出される。",
  },
  href: "org/bukkit/event/player/PlayerJoinEvent.html",
  link: "https://jd.papermc.io/paper/26.2/org/bukkit/event/player/PlayerJoinEvent.html",
  name: "PlayerJoinEvent",
  source: "paper",
};

const eventData = { lang: ["en", "ja"], events: [paperEvent] };

test("searches the current explicit Minecraft version in latest data without changing the response version", async () => {
  const calls = { latest: 0, proxy: 0, fixed: [] as string[] };
  const handler = createSearchEventsHandler({
    getLatestMinecraftVersion: async () => "26.2",
    getServerVersionsDesc: async () => ["26.1.2"],
    readLatestServerEvents: async () => {
      calls.latest += 1;
      return eventData;
    },
    readProxyEvents: async () => {
      calls.proxy += 1;
      return { lang: ["en", "ja"], events: [] };
    },
    readServerEvents: async (version) => {
      calls.fixed.push(version);
      return eventData;
    },
  });

  const response = await handler(
    new NextRequest(
      "https://example.test/api/search/events?q=join&version=26.2&lang=en",
    ),
  );
  const body = (await response.json()) as {
    version: string;
    events: Array<{ version: string; name: string }>;
  };

  assert.equal(response.status, 200);
  assert.equal(body.version, "26.2");
  assert.equal(body.events[0]?.version, "26.2");
  assert.equal(body.events[0]?.name, "PlayerJoinEvent");
  assert.deepEqual(calls, { latest: 1, proxy: 0, fixed: [] });
});

test("does not keep resolving 26.2 to latest after latest advances to 26.3", async () => {
  const calls = { latest: 0, proxy: 0, fixed: 0 };
  const handler = createSearchEventsHandler({
    getLatestMinecraftVersion: async () => "26.3",
    getServerVersionsDesc: async () => ["26.1.2"],
    readLatestServerEvents: async () => {
      calls.latest += 1;
      return eventData;
    },
    readProxyEvents: async () => {
      calls.proxy += 1;
      return { lang: ["en", "ja"], events: [] };
    },
    readServerEvents: async () => {
      calls.fixed += 1;
      return eventData;
    },
  });

  const response = await handler(
    new NextRequest(
      "https://example.test/api/search/events?q=join&version=26.2&lang=en",
    ),
  );

  assert.equal(response.status, 404);
  assert.equal(await response.text(), "Unsupported version: 26.2");
  assert.deepEqual(calls, { latest: 0, proxy: 0, fixed: 0 });
});
