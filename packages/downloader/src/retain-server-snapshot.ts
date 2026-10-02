import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getLatestMinecraftVersionFromVersions } from "../../../src/libs/data-paths";
import type EventType from "./types/event-type";
import { reuseEventMetadata } from "./event-metadata";

export const retainCompleteServerSnapshot = async (
  dataRoot: string,
  snapshot: {
    lang: string[];
    events: EventType[];
    versions: Record<string, string>;
  },
) => {
  const version = getLatestMinecraftVersionFromVersions(snapshot.versions);
  if (!version) return;
  const directory = path.join(dataRoot, "minecraft", version);
  const previousText = await readFile(
    path.join(directory, "events.json"),
    "utf8",
  ).catch((error: NodeJS.ErrnoException) => {
    if (error.code !== "ENOENT") throw error;
    return null;
  });
  const previous = new Map<string, EventType>(
    previousText === null
      ? []
      : (JSON.parse(previousText).events as EventType[]).map((event) => [
          event.name + event.source,
          event,
        ]),
  );
  const events = snapshot.events.map((event) =>
    reuseEventMetadata(
      {
        ...event,
        link: `https://spigot-javadoc.s7a.dev/${event.source}/${version}/${event.href}`,
      },
      previous.get(event.name + event.source),
    ),
  );
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, "events.json"),
    JSON.stringify({ lang: snapshot.lang, events }, null, 2),
  );
  await writeFile(
    path.join(directory, "versions.json"),
    JSON.stringify(snapshot.versions, null, 2),
  );
};
