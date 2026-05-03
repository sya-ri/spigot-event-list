import { readdir, readFile } from "fs/promises";
import path from "path";

type EventRecord = {
  name: string;
  source: string;
  deprecate?: string;
  description?: {
    ja?: string;
    en?: string;
  };
  deprecateDescription?: {
    ja?: string;
    en?: string;
  };
};

type EventFile = {
  events: EventRecord[];
};

type MissingEntry = {
  file: string;
  name: string;
  source: string;
  deprecate?: string;
};

const dataRoot = path.resolve(process.cwd(), "../../data");

const normalize = (value: string | undefined) => (value ?? "").trim();

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

const toRelative = (filePath: string) => path.relative(process.cwd(), filePath);

const check = async () => {
  const files = await walkEventFiles(dataRoot);
  const missingDescriptions: MissingEntry[] = [];
  const missingDeprecations: MissingEntry[] = [];

  for (const filePath of files) {
    const data = JSON.parse(await readFile(filePath, "utf8")) as EventFile;
    for (const event of data.events) {
      const descriptionJa = normalize(event.description?.ja);
      const descriptionEn = normalize(event.description?.en);
      if (!descriptionJa || !descriptionEn) {
        missingDescriptions.push({
          file: toRelative(filePath),
          name: event.name,
          source: event.source,
        });
      }

      if (!event.deprecate) {
        continue;
      }
      const deprecateJa = normalize(event.deprecateDescription?.ja);
      const deprecateEn = normalize(event.deprecateDescription?.en);
      if (!deprecateJa || !deprecateEn) {
        missingDeprecations.push({
          file: toRelative(filePath),
          name: event.name,
          source: event.source,
          deprecate: event.deprecate,
        });
      }
    }
  }

  console.info(
    JSON.stringify(
      {
        files: files.length,
        descriptionMissingCount: missingDescriptions.length,
        deprecateDescriptionMissingCount: missingDeprecations.length,
        descriptionMissingSample: missingDescriptions.slice(0, 20),
        deprecateDescriptionMissingSample: missingDeprecations.slice(0, 20),
      },
      null,
      2,
    ),
  );

  if (missingDescriptions.length > 0 || missingDeprecations.length > 0) {
    process.exitCode = 1;
  }
};

check();
