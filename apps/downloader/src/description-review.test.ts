import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import OpenAI from "openai";
import type EventType from "@spigot-event-list/catalog/types/event-type";
import { applyReviewedMetadata } from "./apply-reviewed-metadata";
import { changedDescriptions, selectChanges } from "./changed-descriptions";
import { reviewEvent, type ReviewTarget } from "./description-review";
import { reviewKeywords } from "./keyword-review";
import type { ReviewedEvent } from "./review-report";

const before: EventType = {
  source: "paper",
  href: "mock/ExampleEvent.html",
  name: "ExampleEvent",
  link: "https://example.org/ExampleEvent.html",
  javadoc: "Called before loading.",
  description: { en: "Called after loading.", ja: "読み込み前に呼び出される。" },
};
test("only added or materially changed events are reviewed, grouping identical snapshot evidence", () => {
  const targets = new Map<string, ReviewTarget>();
  selectChanges(
    "latest",
    [before],
    [{ ...before, javadoc: "Called   before loading.", keywords: { en: ["load"] } }],
    targets,
  );
  assert.equal(targets.size, 0);
  const after = { ...before, javadoc: "Called after loading." };
  selectChanges("latest", [before], [after], targets);
  selectChanges("fixed", [], [{ ...after, link: "https://example.org/fixed" }], targets);
  selectChanges("other", [], [{ ...after, href: "different/ExampleEvent.html" }], targets);
  selectChanges("old", [], [before], targets);
  assert.equal(targets.size, 3);
  assert.deepEqual(
    [...targets.values()][0].references.map((r) => r.file),
    ["latest", "fixed"],
  );
});

test("the downloader reviews new evidence once across tracked and newly created snapshots", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "event-review-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const git = (...args: string[]) => execFileSync("git", args, { cwd: root });
  const snapshot = async (file: string, events: EventType[]) => {
    const path = join(root, file);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, JSON.stringify({ events }));
  };
  git("init", "--quiet");
  const latest = "data/events.json";
  const fixed = "data/minecraft/1.2.3/events.json";
  await snapshot(latest, [before]);
  git("add", "data");
  git(
    "-c",
    "user.name=Test",
    "-c",
    "user.email=test@example.org",
    "-c",
    "commit.gpgsign=false",
    "commit",
    "--quiet",
    "-m",
    "fixture",
  );
  const added = { ...before, name: "NewEvent", href: "mock/NewEvent.html" };
  await snapshot(latest, [before, added]);
  await snapshot(fixed, [before, added]);
  const targets = await changedDescriptions(root);
  assert.equal(targets.length, 1);
  assert.equal(targets[0].event.name, "NewEvent");
  assert.deepEqual(
    targets[0].references.map((r) => r.file),
    [latest, fixed],
  );
});

function mockClient(replies: unknown[]) {
  const calls: { path: string; body: Record<string, unknown> }[] = [];
  const client = new OpenAI({
    apiKey: "test",
    maxRetries: 0,
    fetch: async (input, init) => {
      const path = new URL(input instanceof Request ? input.url : String(input)).pathname;
      calls.push({ path, body: JSON.parse(String(init?.body)) });
      assert.ok(replies.length, "unexpected API call");
      return Response.json(replies.shift());
    },
  });
  return { client, calls };
}
const answer = (name: string, choice: string, confidence = 0.99) => ({
  type: "choice",
  name,
  choice,
  confidence,
  probabilities: [],
});
const draft = (quote: string) => ({
  object: "response",
  status: "completed",
  output: [
    {
      type: "message",
      content: [
        {
          type: "output_text",
          text: JSON.stringify({
            en: {
              text: "Called before loading.",
              quote,
              reason: "The old text reversed the timing.",
            },
          }),
        },
      ],
    },
  ],
});
test("returns an exact quotation and rechecked correction without rewriting the supported language", async () => {
  const { client, calls } = mockClient([
    { answers: [answer("ja", "supported"), answer("en", "mismatch")] },
    draft("before loading"),
    { answers: [{ type: "predicate", name: "en", probability: 0.98 }] },
  ]);
  const result = await reviewEvent(before, client);
  assert.equal(result.en.status, "verified_suggestion");
  assert.equal(result.en.description, "Called before loading.");
  assert.equal(result.en.quote, "before loading");
  assert.equal(result.ja.description, before.description.ja);
  assert.deepEqual(
    calls.map((c) => c.path),
    ["/v1/decisions", "/v1/responses", "/v1/decisions"],
  );
  assert.doesNotMatch(JSON.stringify(calls[2].body), /Called after loading|old text reversed/);
});
test("a fabricated quote or weak verification never publishes a proposed correction", async () => {
  const first = { answers: [answer("en", "mismatch"), answer("ja", "supported")] };
  const a = await reviewEvent(before, mockClient([first, draft("different Javadoc")]).client);
  assert.equal(a.en.description, null);
  const b = await reviewEvent(
    before,
    mockClient([
      first,
      draft("before loading"),
      { answers: [{ type: "predicate", name: "en", probability: 0.6 }] },
    ]).client,
  );
  assert.equal(b.en.status, "needs_review");
  assert.equal(b.en.description, null);
});
test("missing evidence, refusals and low confidence remain unresolved", async () => {
  assert.equal((await reviewEvent({ ...before, javadoc: "" })).ja.status, "needs_review");
  const { client, calls } = mockClient([
    { answers: [{ type: "refusal", name: "ja" }, answer("en", "supported", 0.7)] },
    { answers: [{ type: "predicate", name: "en", probability: 0.72 }] },
  ]);
  const result = await reviewEvent(before, client);
  assert.equal(result.en.description, null);
  assert.equal(result.ja.description, null);
  assert.equal(calls.length, 2);
});

const words = {
  en: ["preload", "start loading", "load start", "load preparation"],
  ja: ["読込前", "先読み", "読み込み開始", "ロード前"],
};

test("returns only structurally valid keyword lists independently verified in both languages", async () => {
  const reply = (keywords: unknown) => ({
    object: "response",
    status: "completed",
    output: [
      { type: "message", content: [{ type: "output_text", text: JSON.stringify(keywords) }] },
    ],
  });
  const answers = (probability: number) => ({
    answers: Object.entries(words).flatMap(([lang, list]) =>
      list.map((_, index) => ({
        type: "predicate",
        name: `${lang}_${index}`,
        probability: lang === "en" && index === 0 ? probability : 0.99,
      })),
    ),
  });
  assert.deepEqual(
    await reviewKeywords(before, mockClient([reply(words), answers(0.99)]).client),
    words,
  );
  assert.equal(await reviewKeywords(before, mockClient([reply(words), answers(0.7)]).client), null);
  assert.deepEqual(
    await reviewKeywords(
      before,
      mockClient([
        reply({ ...words, en: ["after loading", "Example Event", ...words.en, "ＰＲＥＬＯＡＤ"] }),
        answers(0.99),
      ]).client,
    ),
    words,
  );
  const kept = { ...before, keywords: { ...words, en: ["after loading", ...words.en] } };
  assert.deepEqual(await reviewKeywords(kept, mockClient([]).client), words);

  const partial = { ...kept, keywords: { ...words, en: words.en.slice(0, 3) } };
  const { client, calls } = mockClient([
    reply({ en: ["Example Event", "ＰＲＥＬＯＡＤ", "load preparation"] }),
    { answers: [{ type: "predicate", name: "en_0", probability: 0.99 }] },
  ]);
  assert.deepEqual(await reviewKeywords(partial, client), words);
  assert.match(String(calls[0].body.input), /"requested":\["en"\]/u);
});

test("updates all reviewed snapshots and leaves them untouched when a review is incomplete", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "apply-review-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const files = ["data/events.json", "data/minecraft/1.2.3/events.json"];
  const unrelated = { ...before, name: "UnrelatedEvent", href: "mock/UnrelatedEvent.html" };
  const original = JSON.stringify({ lang: ["en", "ja"], events: [before, unrelated] });
  for (const file of files) {
    const path = join(root, file);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, original);
  }
  const review: ReviewedEvent = {
    event: before,
    references: files.map((file) => ({ file, link: before.link })),
    findings: {
      en: {
        status: "verified_suggestion",
        assessment: { verdict: "mismatch" },
        description: "Called before loading.",
      },
      ja: {
        status: "supported",
        assessment: { verdict: "supported" },
        description: before.description.ja,
      },
    },
    keywords: words,
  };
  await assert.rejects(
    applyReviewedMetadata(root, [review, { ...review, event: unrelated, keywords: null }]),
    /Review incomplete/u,
  );
  for (const file of files) assert.equal(await readFile(join(root, file), "utf8"), original);

  const other = join(root, files[1]);
  await writeFile(other, JSON.stringify({ events: [unrelated] }));
  await assert.rejects(applyReviewedMetadata(root, [review]), /Event data changed/u);
  assert.equal(await readFile(join(root, files[0]), "utf8"), original);

  await writeFile(other, original);
  assert.equal(await applyReviewedMetadata(root, [review]), 2);
  for (const file of files) {
    const { events } = JSON.parse(await readFile(join(root, file), "utf8")) as {
      events: EventType[];
    };
    assert.deepEqual(events, [
      {
        ...before,
        description: { ...before.description, en: "Called before loading." },
        keywords: words,
      },
      unrelated,
    ]);
  }
});
