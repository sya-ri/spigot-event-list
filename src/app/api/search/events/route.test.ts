import assert from "node:assert/strict";
import { test } from "node:test";
import { NextRequest } from "next/server";
import EventType from "../../../../../packages/downloader/src/types/event-type";
import { createSearchEventsHandler } from "./handler";
import type { SearchEventsResponse } from "@/types/event";

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

const makeHandler = (events: EventType[] = [paperEvent]) =>
  createSearchEventsHandler({
    getLatestMinecraftVersion: async () => "26.2",
    getServerVersionsDesc: async () => ["26.1.2"],
    readLatestServerEvents: async () => ({ lang: ["en", "ja"], events }),
    readServerEvents: async () => ({ lang: ["en", "ja"], events }),
    readProxyEvents: async () => ({
      lang: ["en", "ja"],
      events: [{ ...paperEvent, name: "ProxyEvent", source: "velocity" }],
    }),
  });

test("paginates beyond 100 matches without losing or duplicating events", async () => {
  const events = Array.from({ length: 137 }, (_, index) => ({
    ...paperEvent,
    name: `Event${String(index).padStart(3, "0")}`,
  }));
  const handler = makeHandler(events.reverse());
  const found: string[] = [];
  let offset: number | null = 0;
  while (offset !== null) {
    const response = await handler(
      new NextRequest(
        `https://example.test/api/search/events?q=event&limit=50&offset=${offset}`,
      ),
    );
    const data = (await response.json()) as SearchEventsResponse;
    assert.equal(data.total, 137);
    assert.equal(data.offset, offset);
    assert.equal(data.count, data.events.length);
    found.push(...data.events.map((event) => event.name));
    offset = data.nextOffset;
  }
  assert.equal(found.length, 137);
  assert.equal(new Set(found).size, 137);
  assert.deepEqual(found, [...found].sort());
});

test("browses without a query and applies source filters before pagination", async () => {
  const handler = makeHandler([
    { ...paperEvent, source: "spigot" },
    paperEvent,
  ]);
  const response = await handler(
    new NextRequest(
      "https://example.test/api/search/events?source=paper&limit=1&lang=en",
    ),
  );
  const data = (await response.json()) as SearchEventsResponse;
  assert.equal(data.total, 1);
  assert.equal(data.events[0].source, "paper");
  assert.equal(data.events[0].description, paperEvent.description.en);
  assert.equal(data.nextOffset, null);
});

test("cached keyword matches retain bilingual metadata across pages and languages", async () => {
  const keywords = { ja: ["接続受付"], en: ["connection admission"] };
  const events = ["AlphaEvent", "BetaEvent"].map((name) => ({
    ...paperEvent,
    name,
    keywords,
    javadoc: "Original class documentation.",
  }));
  const handler = makeHandler(events);
  for (const [q, lang] of [
    ["接続受付", "en"],
    ['"ｃｏｎｎｅｃｔｉｏｎ　ａｄｍｉｓｓｉｏｎ"', "ja"],
  ]) {
    let offset: number | null = 0;
    const names: string[] = [];
    while (offset !== null) {
      const params = new URLSearchParams({
        q,
        lang,
        limit: "1",
        offset: String(offset),
      });
      const response = await handler(
        new NextRequest(`https://example.test/api/search/events?${params}`),
      );
      assert.equal(response.status, 200);
      const data = (await response.json()) as SearchEventsResponse;
      assert.equal(data.total, 2);
      assert.equal(data.count, 1);
      assert.deepEqual(data.events[0].keywords, keywords);
      assert.equal(data.events[0].javadoc, events[0].javadoc);
      assert.equal(data.events[0].description, paperEvent.description[lang]);
      names.push(data.events[0].name);
      offset = data.nextOffset;
    }
    assert.deepEqual(names, ["AlphaEvent", "BetaEvent"]);
  }
});

test("empty selections, stop words and no matches return successful empty results", async () => {
  for (const query of [
    "source=",
    "source=unknown",
    "q=the",
    "q=absent",
    "offset=1000",
  ]) {
    const response = await makeHandler()(
      new NextRequest(`https://example.test/api/search/events?${query}`),
    );
    assert.equal(response.status, 200);
    const data = (await response.json()) as SearchEventsResponse;
    assert.deepEqual(data.events, []);
    assert.equal(data.nextOffset, null);
  }
});

test("invalid pagination parameters are bounded and unsupported languages fail clearly", async () => {
  for (const query of [
    "limit=0&offset=-1",
    "limit=oops&offset=NaN",
    "limit=1.5&offset=Infinity",
  ]) {
    const response = await makeHandler()(
      new NextRequest(`https://example.test/api/search/events?${query}`),
    );
    const data = (await response.json()) as SearchEventsResponse;
    assert.equal(data.count, 1);
    assert.equal(data.offset, 0);
  }
  const response = await makeHandler()(
    new NextRequest("https://example.test/api/search/events?lang=unsupported"),
  );
  assert.equal(response.status, 400);
});

test("historical searches include current proxy events exactly once", async () => {
  const response = await makeHandler()(
    new NextRequest("https://example.test/api/search/events?version=26.1.2"),
  );
  const data = (await response.json()) as SearchEventsResponse;
  assert.equal(data.total, 2);
  assert.deepEqual(
    data.events.map((event) => event.source),
    ["paper", "velocity"],
  );
});

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
