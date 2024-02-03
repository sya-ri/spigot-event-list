import { getSources } from "./sources/sources";
import { writeFile } from "fs/promises";
import downloadLatestEvents from "./download-latest-events";
import EventType from "./types/event-type";

const index = async () => {
  const sources = await getSources();
  const events = await downloadLatestEvents(sources);
  await writeEvents(events);
  await writeVersions(
    Object.fromEntries(
      Object.entries(sources).map(([name, source]) => [
        name,
        source.artifact.version.split("-")[0] + " - #" + source.buildNumber,
      ]),
    ),
  );
};

const writeEvents = (sources: Record<string, EventType>) => {
  const events = Object.values(sources)
    .sort((a, b) => (a.name + a.source).localeCompare(b.name + b.source))
    .map(
      (value): EventType => ({
        deprecate: value.deprecate,
        deprecateDescription: value.deprecate
          ? value.deprecateDescription
          : undefined,
        description: value.description,
        abstract: value.abstract,
        href: value.href,
        javadoc: value.javadoc,
        link: value.link,
        name: value.name,
        source: value.source,
      }),
    );
  return writeFile("../../data/events.json", JSON.stringify(events, null, 2));
};

const writeVersions = (versions: Record<string, string>) => {
  return writeFile(
    "../../data/versions.json",
    JSON.stringify(versions, null, 2),
  );
};

index();
