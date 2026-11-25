import { randomUUID } from "node:crypto";
import { readFile, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type EventType from "@spigot-event-list/catalog/types/event-type";
import { reviewTargetKey } from "./changed-descriptions";
import type { ReviewedEvent } from "./review-report";

export async function applyReviewedMetadata(root: string, reviewed: ReviewedEvent[]) {
  const pending = reviewed.filter(
    ({ findings, keywords }) => !findings.en.description || !findings.ja.description || !keywords,
  );
  if (pending.length) {
    const names = pending.slice(0, 10).map(({ event }) => `${event.source}/${event.name}`);
    throw new Error(
      `Review incomplete for ${pending.length} events (${names.join(", ")}). See the description-review artifact.`,
    );
  }
  const byFile = new Map<string, Map<string, ReviewedEvent>>();
  for (const review of reviewed) {
    for (const { file } of review.references) {
      const entries = byFile.get(file) ?? new Map<string, ReviewedEvent>();
      entries.set(reviewTargetKey(review.event), review);
      byFile.set(file, entries);
    }
  }
  const changes = [];
  for (const [file, entries] of byFile) {
    const path = resolve(root, file);
    const previous = await readFile(path, "utf8");
    const data: { events: EventType[] } = JSON.parse(previous);
    let updated = 0;
    for (const event of data.events) {
      const review = entries.get(reviewTargetKey(event));
      if (!review) continue;
      const { findings, keywords } = review;
      if (!findings.en.description || !findings.ja.description || !keywords) {
        throw new Error(`Review incomplete for ${event.name} in ${file}.`);
      }
      if (findings.en.status === "verified_suggestion")
        event.description.en = findings.en.description;
      if (findings.ja.status === "verified_suggestion")
        event.description.ja = findings.ja.description;
      event.keywords = { ...event.keywords, ...keywords };
      updated++;
    }
    if (updated !== entries.size) throw new Error(`Event data changed during review in ${file}.`);
    const next = JSON.stringify(data, null, 2) + "\n";
    if (next.trimEnd() !== previous.trimEnd()) changes.push({ path, previous, next });
  }
  for (const { path, previous, next } of changes) {
    if ((await readFile(path, "utf8")) !== previous)
      throw new Error(`Event data changed during review in ${path}.`);
    const temporary = path + "." + randomUUID() + ".tmp";
    try {
      await writeFile(temporary, next, { flag: "wx" });
      await rename(temporary, path);
    } finally {
      await rm(temporary, { force: true });
    }
  }
  return changes.length;
}
