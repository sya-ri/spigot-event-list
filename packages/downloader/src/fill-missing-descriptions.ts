import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type EventType from "./types/event-type";
import { eventEvidenceKey, hasLocalizedDescription } from "./event-metadata";

type EventFile = { lang: string[]; events: EventType[] };

const deprecationDefaults: Record<string, Record<string, string>> = {
  "@Experimental": { ja: "実験段階。", en: "Experimental phase." },
  "@Beta": { ja: "ベータ段階。", en: "Beta phase." },
};

const walkEventFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? walkEventFiles(entryPath)
        : entry.name === "events.json"
          ? [entryPath]
          : [];
    }),
  );
  return files.flat().sort();
};

export const fillMissingDescriptionsInData = async (dataRoot: string) => {
  const parsed = await Promise.all(
    (await walkEventFiles(dataRoot)).map(async (filePath) => ({
      filePath,
      data: JSON.parse(await readFile(filePath, "utf8")) as EventFile,
    })),
  );
  const candidates = new Map<string, EventType[]>();
  for (const { data } of parsed)
    for (const event of data.events) {
      const key = eventEvidenceKey(event);
      candidates.set(key, [...(candidates.get(key) ?? []), event]);
    }
  for (const { filePath, data } of parsed) {
    const before = JSON.stringify(data);
    for (const event of data.events) {
      const matches = candidates.get(eventEvidenceKey(event)) ?? [];
      for (const lang of data.lang) {
        if (!hasLocalizedDescription(event.description[lang], lang)) {
          event.description[lang] =
            matches.find((other) =>
              hasLocalizedDescription(other.description[lang], lang),
            )?.description[lang] ?? "";
        }
        if (!event.keywords?.[lang]?.length) {
          const keywords = matches.find(
            (other) => other.keywords?.[lang]?.length,
          )?.keywords?.[lang];
          if (keywords)
            event.keywords = { ...event.keywords, [lang]: [...keywords] };
        }
        // Deprecation reasons can change even when the class summary does not.
        // Only these annotation-wide defaults are safe to fill automatically.
        const fallback =
          event.deprecate && deprecationDefaults[event.deprecate]?.[lang];
        if (
          fallback &&
          !hasLocalizedDescription(event.deprecateDescription?.[lang], lang)
        ) {
          event.deprecateDescription = {
            ...event.deprecateDescription,
            [lang]: fallback,
          };
        }
      }
      // Keep raw Javadoc solely in javadoc; missing translations stay visibly incomplete.
    }
    if (JSON.stringify(data) !== before)
      await writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
  }
};
