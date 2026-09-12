import assert from "node:assert/strict";
import test from "node:test";
import { readFile, readdir } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { NextRequest } from "next/server";
import { GET as search } from "../src/app/api/search/events/route";
import { GET as list } from "../src/app/api/versions/[version]/events/route";
import { parseQuery, scoreEvent } from "../src/libs/event-search";
import type EventType from "../packages/downloader/src/types/event-type";

const latest = JSON.parse(readFileSync("data/events.json", "utf8"))
  .events as EventType[];
const event = (name: string, source?: string) =>
  latest.find((e) => e.name === name && (!source || e.source === source))!;
const query = (e: EventType, q: string) => scoreEvent(e, parseQuery(q));
const request = (q: string, extra: Record<string, string> = {}) =>
  new NextRequest(
    `http://localhost/api/search/events?${new URLSearchParams({ q, ...extra })}`,
  );

test("Japanese and English aliases match without depending on display language", () => {
  assert.ok(query(event("BlockBreakEvent"), "採掘"));
  assert.ok(query(event("BlockBreakEvent"), "mining"));
  assert.ok(query(event("PlayerAFKEvent"), "離席する"));
  assert.ok(query(event("PlayerAFKEvent"), "ＡＦＫ"));
  assert.ok(query(event("TurtleGoHomeEvent"), "帰巣"));
});

test("expanded everyday phrases find their intended events in either language", async () => {
  for (const [phrase, name] of [
    ["掘削", "BlockBreakEvent"],
    ["オートコンプリート", "AsyncTabCompleteEvent"],
    ["無操作", "PlayerAFKEvent"],
    ['"away from keyboard"', "PlayerAFKEvent"],
    ['"slot swap"', "PlayerPickBlockEvent"],
    ["入力候補", "AsyncPlayerSendSuggestionsEvent"],
  ]) {
    const response = await search(
      request(phrase, { lang: "en", limit: "100" }),
    );
    assert.equal(response.status, 200, phrase);
    const data = await response.json();
    assert.ok(
      data.events.some((e: EventType) => e.name === name),
      phrase,
    );
  }
  assert.equal(query(event("BlockBreakEvent"), "無操作"), 0);
  assert.equal(query(event("PlayerAFKEvent"), "掘削"), 0);
});

test("implicit AND, explicit AND, OR precedence, quoted phrases and literals", () => {
  const e = event("BlockBreakEvent");
  assert.equal(query(e, "採掘 離席"), 0);
  assert.equal(query(e, "採掘 AND 離席"), 0);
  assert.ok(query(e, "採掘 OR 離席"));
  assert.ok(query(e, "採掘 OR 離席 AND nonexistent"));
  assert.ok(query(e, '"block break"'));
  assert.equal(query(e, '"mining block"'), 0);
  assert.deepEqual(parseQuery('"OR"'), [{ terms: [{ normalized: "or" }] }]);
  assert.deepEqual(parseQuery("the and"), []);
});

test("exact identifiers rank above aliases, and aliases above incidental prose", () => {
  const e = event("BlockBreakEvent");
  assert.ok(query(e, e.name) > query(e, "mining"));
  const prose = {
    ...e,
    keywords: {},
    description: { en: "Contains mining in a note." },
    javadoc: "",
  };
  assert.ok(query(e, "mining") > query(prose, "mining"));
});

test("search exposes localized descriptions, bilingual keywords and Javadoc", async () => {
  const response = await search(
    request("離席", { source: "purpur", lang: "en" }),
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  const afk = data.events.find((e: EventType) => e.name === "PlayerAFKEvent");
  assert.ok(afk.description.includes("AFK"));
  assert.ok(afk.keywords.ja.includes("離席"));
  assert.ok(afk.keywords.en.includes("idle"));
  const all = await list(
    new NextRequest("http://localhost/api/versions/latest/events?lang=ja"),
    { params: Promise.resolve({ version: "latest" }) },
  );
  const block = (await all.json()).find(
    (e: EventType) => e.name === "BlockBreakEvent",
  );
  assert.ok(block.javadoc);
  assert.ok(block.keywords.ja.includes("採掘"));
});

test("pagination provides all matches beyond 100 without duplicates", async () => {
  const first = await (await search(request("Event", { limit: "100" }))).json();
  assert.ok(first.total > 100);
  assert.equal(first.count, 100);
  const keys = new Set<string>();
  for (let offset = 0; offset < first.total; offset += 100) {
    const page = await (
      await search(request("Event", { limit: "100", offset: String(offset) }))
    ).json();
    assert.equal(page.offset, offset);
    assert.equal(page.total, first.total);
    for (const e of page.events) {
      const key = `${e.source}:${e.link}`;
      assert.ok(!keys.has(key));
      keys.add(key);
    }
  }
  assert.equal(keys.size, first.total);
});

test("version and source filters, language validation and empty queries", async () => {
  const data = await (
    await search(
      request("採掘", { version: "1.10.2", source: "spigot", lang: "ja" }),
    )
  ).json();
  assert.ok(data.events.length > 0);
  assert.ok(
    data.events.every(
      (e: EventType & { version: string }) =>
        e.source === "spigot" && e.version === "1.10.2",
    ),
  );
  const browsing = await search(request(""));
  assert.equal(browsing.status, 200);
  assert.equal((await browsing.json()).total, latest.length);
  const ignored = await search(request("the and"));
  assert.equal(ignored.status, 200);
  assert.equal((await ignored.json()).total, 0);
  assert.equal(
    (await search(request("mining", { version: "../invalid" }))).status,
    404,
  );
  assert.equal(
    (await search(request("mining", { lang: "unknown" }))).status,
    400,
  );
});

test("every dataset event has actual bilingual descriptions and curated keywords", async () => {
  const files = [
    "data/events.json",
    "data/proxy/events.json",
    ...(await readdir("data/minecraft")).map(
      (version) => `data/minecraft/${version}/events.json`,
    ),
  ];
  for (const file of files) {
    const data = JSON.parse(await readFile(file, "utf8"));
    for (const e of data.events as EventType[]) {
      const label = `${file}: ${e.source}/${e.name}`;
      assert.match(e.description.ja, /[\u3040-\u30ff\u3400-\u9fff]/, label);
      assert.ok(e.description.en.trim(), label);
      for (const lang of ["ja", "en"]) {
        assert.doesNotMatch(
          e.description[lang],
          /<\/?(?:p|br|div)\b|\{@(?:link|code)/,
          label,
        );
        const words = e.keywords?.[lang];
        assert.ok(words && words.length >= 6, label);
        assert.ok(
          words.every((word) => word.trim() === word && word.length > 0),
          label,
        );
        assert.equal(
          new Set(words.map((w) => w.normalize("NFKC").toLowerCase())).size,
          words.length,
          label,
        );
      }
    }
  }
});

test("regressions retain accurate event intent and historical distinctions", async () => {
  assert.match(event("ProxyPreShutdownEvent").description.ja, /切断する前/);
  assert.match(
    event("RegionizedServerInitEvent").description.en,
    /before regions begin ticking/,
  );
  assert.match(event("TurtleLayEggEvent").description.ja, /卵を産む/);
  assert.doesNotMatch(event("WitchReadyPotionEvent").description.en, /brew/i);
  assert.match(
    event("PlayerPurchaseEvent").description.en,
    /standalone merchant/,
  );
  const old = JSON.parse(
    await readFile("data/minecraft/1.10.2/events.json", "utf8"),
  ).events as EventType[];
  assert.doesNotMatch(
    old.find((e) => e.name === "BlockExplodeEvent")!.description.en,
    /getExplodedBlockState/,
  );
  assert.match(
    old.find((e) => e.name === "VillagerReplenishTradeEvent")!.description.en,
    /maximum uses/,
  );
  assert.ok(
    query(
      old.find((e) => e.name === "VillagerReplenishTradeEvent")!,
      '"trade limit"',
    ),
  );
  assert.equal(
    query(
      old.find((e) => e.name === "VillagerReplenishTradeEvent")!,
      "リストック",
    ),
    0,
  );
  const v113 = JSON.parse(
    await readFile("data/minecraft/1.13.2/events.json", "utf8"),
  ).events as EventType[];
  assert.equal(
    query(
      v113.find((e) => e.name === "EntityPlaceEvent")!,
      "ボート",
    ),
    0,
  );
  assert.ok(query(event("EntityPlaceEvent"), "ボート"));
  const v114 = JSON.parse(
    await readFile("data/minecraft/1.14.4/events.json", "utf8"),
  ).events as EventType[];
  const v115 = JSON.parse(
    await readFile("data/minecraft/1.15.2/events.json", "utf8"),
  ).events as EventType[];
  assert.match(
    v114.find((e) => e.name === "LootableInventoryFirstFillEvent")!.description
      .en,
    /does not dispatch/,
  );
  assert.match(
    v115.find((e) => e.name === "LootableInventoryFirstFillEvent")!.description
      .en,
    /Fired when/,
  );
});
