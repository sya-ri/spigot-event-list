import assert from "node:assert/strict";
import test from "node:test";
import { mkdtemp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { load } from "cheerio";
import { extractJavadocText } from "../packages/downloader/src/javadoc-text";
import { reuseEventMetadata } from "../packages/downloader/src/event-metadata";
import { fillMissingDescriptionsInData } from "../packages/downloader/src/fill-missing-descriptions";
import { extractClassJavadoc } from "../packages/downloader/src/purpur-patch-events";
import type EventType from "../packages/downloader/src/types/event-type";

const base: EventType = {
  name: "SampleEvent",
  source: "paper",
  href: "sample/SampleEvent.html",
  link: "https://example.test/1/sample/SampleEvent.html",
  javadoc: "Fired before loading.",
  description: {
    ja: "読み込み前に呼び出される。",
    en: "Fired before loading.",
  },
  keywords: { ja: ["読み込み", "開始前"], en: ["loading", "before"] },
};

test("reuse preserves keywords and version-specific edits only with matching evidence", () => {
  const fresh = {
    ...base,
    description: { ja: "", en: "" },
    keywords: undefined,
  };
  assert.deepEqual(reuseEventMetadata(fresh, base).keywords, base.keywords);
  assert.deepEqual(
    reuseEventMetadata({ ...fresh, javadoc: "Fired\nbefore loading." }, base)
      .description,
    base.description,
  );
  assert.equal(
    reuseEventMetadata({ ...fresh, javadoc: "Fired after loading." }, base)
      .description.ja,
    "",
  );
  assert.equal(
    reuseEventMetadata({ ...fresh, href: "other/SampleEvent.html" }, base)
      .description.ja,
    "",
  );
  assert.equal(
    reuseEventMetadata(
      {
        ...fresh,
        javadoc: undefined,
        link: "https://example.test/2/sample/SampleEvent.html",
      },
      { ...base, javadoc: undefined },
    ).description.ja,
    "",
  );
});

test("Javadoc extraction separates class prose from deprecation and preserves word boundaries", () => {
  const $ = load(
    '<section id="class-description"><div class="deprecation-block"><div class="block">Use AnotherEvent.</div></div><div class="block">Called when a block\nchanges.<p>Second paragraph.</p></div></section>',
  );
  assert.equal(
    extractJavadocText($, "#class-description"),
    "Called when a block changes. Second paragraph.",
  );
  const legacy = load(
    '<div class="description"><div class="block"><span class="deprecatedLabel">Deprecated.</span>Duplicate notice</div><div class="block">Actual summary.</div></div>',
  );
  assert.equal(extractJavadocText(legacy, ".description"), "Actual summary.");
  assert.equal(
    extractClassJavadoc(
      "/** Called when a cooldown is applied. */\npublic final class PlayerItemCooldownEvent {}",
    ),
    "Called when a cooldown is applied.",
  );
});

test("cleaning duplicated legacy deprecation notices preserves reviewed metadata", () => {
  const previous = {
    ...base,
    deprecate: "@Deprecated",
    deprecateDescription: {
      en: "Use OtherEvent.",
      ja: "OtherEvent を使用する。",
    },
    javadoc: "Deprecated. Use OtherEvent.Use OtherEvent.Fired before loading.",
  };
  const fresh = {
    ...previous,
    javadoc: base.javadoc,
    description: { ja: "", en: "" },
    keywords: undefined,
  };
  assert.deepEqual(
    reuseEventMetadata(fresh, previous).description,
    base.description,
  );
  assert.equal(
    reuseEventMetadata({ ...fresh, javadoc: "Fired after loading." }, previous)
      .description.ja,
    "",
  );
});

test("filling missing metadata never inserts English into Japanese or crosses evidence", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "event-metadata-"));
  try {
    await mkdir(path.join(root, "history"));
    const write = (file: string, events: EventType[]) =>
      writeFile(
        path.join(root, file),
        JSON.stringify({ lang: ["ja", "en"], events }),
      );
    await write("events.json", [base]);
    await write("history/events.json", [
      { ...base, description: { ja: "", en: "" }, keywords: undefined },
      {
        ...base,
        name: "ChangedEvent",
        href: "sample/ChangedEvent.html",
        javadoc: "A new event.",
        description: { ja: "A new event.", en: "" },
        keywords: undefined,
      },
      {
        ...base,
        href: "changed/SampleEvent.html",
        description: { ja: "", en: "" },
        keywords: undefined,
        deprecate: "@Experimental",
      },
    ]);
    await fillMissingDescriptionsInData(root);
    const { events } = JSON.parse(
      await readFile(path.join(root, "history/events.json"), "utf8"),
    );
    assert.deepEqual(events[0].description, base.description);
    assert.deepEqual(events[0].keywords, base.keywords);
    assert.deepEqual(events[1].description, { ja: "", en: "" });
    assert.equal(events[2].description.ja, "");
    assert.equal(events[2].deprecateDescription.ja, "実験段階。");
    const before = await readFile(
      path.join(root, "history/events.json"),
      "utf8",
    );
    await fillMissingDescriptionsInData(root);
    assert.equal(
      await readFile(path.join(root, "history/events.json"), "utf8"),
      before,
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
