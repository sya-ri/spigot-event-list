import assert from "node:assert/strict";
import { test } from "node:test";
import { parseQuery, scoreEvent } from "./event-search";
import type EventType from "../../packages/downloader/src/types/event-type";

const event: EventType = {
  name: "PlayerJoinEvent",
  source: "spigot",
  href: "join.html",
  link: "https://example.test/join",
  description: {
    en: "A player joins the server",
    ja: "プレイヤーがサーバーに参加した時に呼び出される。",
  },
  javadoc: "A connected player",
  deprecateDescription: { en: "Use another API" },
};
test("whitespace and AND require all terms, while OR allows alternatives", () => {
  for (const query of [
    "player absent",
    "player AND absent",
    "absent OR player missing",
  ])
    assert.equal(scoreEvent(event, parseQuery(query)), 0);
  for (const query of [
    "player server",
    "player AND server",
    "absent OR player server",
  ])
    assert.ok(scoreEvent(event, parseQuery(query)) > 0);
});
test("quoted phrases remain contiguous and quoted operators are literal", () => {
  assert.ok(scoreEvent(event, parseQuery('"player joins"')) > 0);
  assert.equal(scoreEvent(event, parseQuery('"joins player"')), 0);
  assert.equal(scoreEvent(event, parseQuery('"AND"')), 0);
  assert.ok(scoreEvent(event, parseQuery('"a"')) > 0);
});
test("searches Japanese, Javadoc and deprecation text and ranks exact names first", () => {
  for (const query of ["参加したとき", "connected", "another"])
    assert.ok(scoreEvent(event, parseQuery(query)) > 0);
  assert.ok(
    scoreEvent(event, parseQuery("PlayerJoinEvent")) >
      scoreEvent(event, parseQuery("player")),
  );
});
test("empty and stop-word-only queries have no searchable clauses", () => {
  for (const query of ["", "  ", "the and when", "AND OR"])
    assert.deepEqual(parseQuery(query), []);
});
