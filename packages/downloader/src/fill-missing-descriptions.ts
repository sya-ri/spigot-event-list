import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";

type EventRecord = {
  name: string;
  source: string;
  deprecate?: string;
  deprecateDescription?: {
    ja?: string;
    en?: string;
  };
  javadoc?: string;
  description: {
    ja?: string;
    en?: string;
  };
};

type EventFile = {
  lang: string[];
  events: EventRecord[];
};

type DescriptionPair = {
  ja: string;
  en: string;
};

const deprecateDescriptionDefaults = new Map<string, DescriptionPair>([
  [
    "@Experimental",
    {
      ja: "実験段階。",
      en: "Experimental phase.",
    },
  ],
  [
    "@Beta",
    {
      ja: "ベータ段階。",
      en: "Beta phase.",
    },
  ],
]);

const eventKey = (event: Pick<EventRecord, "name" | "source">) =>
  `${event.name}|${event.source}`;

const normalizeText = (text: string | undefined) =>
  (text ?? "").replace(/\s+/g, " ").trim();

const hasDescription = (description: EventRecord["description"] | undefined) =>
  Boolean(normalizeText(description?.ja) && normalizeText(description?.en));

const hasDeprecateDescription = (
  description: EventRecord["deprecateDescription"] | undefined,
) => Boolean(normalizeText(description?.ja) && normalizeText(description?.en));

const scoreDescription = (description: DescriptionPair) =>
  description.ja.length + description.en.length;

const walkEventFiles = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return walkEventFiles(entryPath);
      }
      return entry.name === "events.json" ? [entryPath] : [];
    }),
  );
  return files.flat().sort();
};

export const fillMissingDescriptionsInData = async (dataRoot: string) => {
  const eventFiles = await walkEventFiles(dataRoot);
  const parsedFiles = await Promise.all(
    eventFiles.map(async (filePath) => ({
      filePath,
      data: JSON.parse(await readFile(filePath, "utf8")) as EventFile,
    })),
  );

  const canonicalDescriptions = new Map<string, DescriptionPair>();
  for (const { data } of parsedFiles) {
    for (const event of data.events) {
      if (!hasDescription(event.description)) {
        continue;
      }
      const key = eventKey(event);
      const candidate = {
        ja: normalizeText(event.description.ja),
        en: normalizeText(event.description.en),
      };
      const current = canonicalDescriptions.get(key);
      if (!current || scoreDescription(candidate) > scoreDescription(current)) {
        canonicalDescriptions.set(key, candidate);
      }
    }
  }

  for (const { filePath, data } of parsedFiles) {
    let changed = false;
    for (const event of data.events) {
      if (
        event.deprecate &&
        !hasDeprecateDescription(event.deprecateDescription)
      ) {
        const fallback = deprecateDescriptionDefaults.get(event.deprecate);
        if (fallback) {
          event.deprecateDescription = {
            ja: normalizeText(event.deprecateDescription?.ja) || fallback.ja,
            en: normalizeText(event.deprecateDescription?.en) || fallback.en,
          };
          changed = true;
        }
      }
      const key = eventKey(event);
      const current = {
        ja: normalizeText(event.description?.ja),
        en: normalizeText(event.description?.en),
      };
      if (current.ja && current.en) {
        continue;
      }
      const canonical = canonicalDescriptions.get(key);
      if (canonical) {
        event.description = {
          ja: current.ja || canonical.ja,
          en: current.en || canonical.en,
        };
        changed = true;
        continue;
      }
      const javadoc = normalizeText(event.javadoc);
      if (!javadoc) {
        continue;
      }
      event.description = {
        ja: current.ja || javadoc,
        en: current.en || javadoc,
      };
      changed = true;
    }
    if (changed) {
      await writeFile(filePath, JSON.stringify(data, null, 2) + "\n");
    }
  }
};
