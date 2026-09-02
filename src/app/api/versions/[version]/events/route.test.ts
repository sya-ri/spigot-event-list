import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import EventType from "../../../../../../packages/downloader/src/types/event-type";
import { createVersionEventsHandler } from "./handler";

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

test("reads latest data for the current explicit Minecraft version", async () => {
  const calls = { latest: 0, proxy: 0, fixed: [] as string[] };
  const handler = createVersionEventsHandler({
    getLatestMinecraftVersion: async () => "26.2",
    getServerVersionsDesc: async () => ["26.1.2"],
    readLatestServerEvents: async () => {
      calls.latest += 1;
      return { lang: ["en", "ja"], events: [paperEvent] };
    },
    readProxyEvents: async () => {
      calls.proxy += 1;
      return { lang: ["en", "ja"], events: [] };
    },
    readServerEvents: async (version) => {
      calls.fixed.push(version);
      return { lang: ["en", "ja"], events: [paperEvent] };
    },
  });

  const response = await handler(
    new NextRequest("https://example.test/api/versions/26.2/events?lang=en"),
    { params: Promise.resolve({ version: "26.2" }) },
  );
  const body = (await response.json()) as Array<Record<string, unknown>>;

  assert.equal(response.status, 200);
  assert.equal(body[0]?.name, "PlayerJoinEvent");
  assert.equal("version" in (body[0] ?? {}), false);
  assert.deepEqual(calls, { latest: 1, proxy: 0, fixed: [] });
});
