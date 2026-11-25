import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type EventType from "@spigot-event-list/catalog/types/event-type";
import type { ReviewEvent, ReviewTarget } from "./description-review";

const identity = (event: ReviewEvent) => JSON.stringify([event.source, event.href]);
const normalize = (text?: string) => text?.trim().replace(/\s+/gu, " ") ?? "";
const contents = (e: ReviewEvent) =>
  JSON.stringify([
    e.name,
    normalize(e.javadoc),
    normalize(e.description.en),
    normalize(e.description.ja),
  ]);

export function selectChanges(
  file: string,
  previous: EventType[],
  current: EventType[],
  targets: Map<string, ReviewTarget>,
) {
  const previousById = new Map(previous.map((e) => [identity(e), contents(e)]));
  for (const e of current) {
    const id = identity(e);
    const fingerprint = contents(e);
    if (previousById.get(id) === fingerprint) continue;
    const key = JSON.stringify([id, fingerprint]);
    let target = targets.get(key);
    if (!target) {
      const { source, name, href, javadoc, description } = e;
      target = { event: { source, name, href, javadoc, description }, references: [] };
      targets.set(key, target);
    }
    target.references.push({ file, link: e.link });
  }
}

export async function changedDescriptions(root: string) {
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  const files = new Set(
    [
      ...git("diff", "--name-only", "-z", "--diff-filter=ACMRT", "HEAD", "--", "data").split("\0"),
      ...git("ls-files", "--others", "--exclude-standard", "-z", "--", "data").split("\0"),
    ].filter((file) => /^data\/(?:minecraft\/[^/]+\/|proxy\/)?events\.json$/.test(file)),
  );
  const targets = new Map<string, ReviewTarget>();
  if (!files.size) return [];
  const tracked = new Set(
    git("ls-tree", "-r", "--name-only", "-z", "HEAD", "--", "data").split("\0"),
  );
  const readEvents = (text: string): EventType[] => JSON.parse(text).events;
  for (const file of [...files].sort()) {
    // New fixed snapshots often duplicate the previous latest release. Only review new evidence.
    const base = tracked.has(file) ? file : "data/events.json";
    const previous = tracked.has(base) ? readEvents(git("show", "HEAD:" + base)) : [];
    selectChanges(file, previous, readEvents(await readFile(resolve(root, file), "utf8")), targets);
  }
  return [...targets.values()];
}
