import MultiProgress from "multi-progress";
import { access, mkdir, readFile, rm } from "fs/promises";
import { zip } from "compressing";
import path from "path";
import { downloadArtifact } from "./maven";
import { getSourceType, Source } from "./sources/sources";
import EventType from "./types/event-type";
import { load } from "cheerio";
import SourceType from "./types/source-type";
import axios from "axios";
import { createDataPaths } from "../../../src/libs/data-paths";

const { proxyDataPath, readLatestServerEvents } = createDataPaths(
  path.resolve(process.cwd(), "../../data"),
);

const javadocPath = (filename: string) => path.join("javadoc", filename);
const allClassesCandidates = [
  "allclasses-index.html",
  "allclasses-noframe.html",
  "allclasses-frame.html",
];

type SourceReader = {
  readAllClasses: (preferred: string) => Promise<string>;
  readPage: (href: string) => Promise<string>;
};

const downloadLatestEvents = async (
  sources: Record<string, Source>,
): Promise<[string[], Record<string, EventType>]> => {
  const readers = await prepareSourceReaders(sources);
  const [lang, lastEvents] = await getLastEvents();
  return [lang, await getLatestEvents(sources, readers, lastEvents, lang)];
};

const prepareSourceReaders = async (
  sources: Record<string, Source>,
): Promise<Record<string, SourceReader>> => {
  console.info("Download Javadoc:");
  const multiProgress = new MultiProgress();
  await rm(javadocPath(""), { recursive: true, force: true });
  await mkdir(javadocPath(""));
  const readers = await Promise.all(
    Object.entries(sources).map(async ([name, source]) => [
      name,
      await prepareSourceReader(multiProgress, name, source),
    ]),
  );
  return Object.fromEntries(readers);
};

const getLastEvents = async (): Promise<
  [string[], Record<string, EventType>]
> => {
  const [data, proxyText] = await Promise.all([
    readLatestServerEvents().catch(
      () =>
        ({
          lang: ["en", "ja"],
          events: [],
        }) as { lang: string[]; events: EventType[] },
    ),
    readFile(proxyDataPath("events.json"), "utf8").catch(() => null),
  ]);
  const proxyData: { lang: string[]; events: EventType[] } | null = proxyText
    ? JSON.parse(proxyText)
    : null;
  const allEvents = [...data.events, ...(proxyData?.events ?? [])];
  return [
    data.lang,
    Object.fromEntries(
      allEvents.map((event) => [event.name + event.source, event]),
    ),
  ];
};

const getLatestEvents = async (
  sources: Record<string, Source>,
  readers: Record<string, SourceReader>,
  lastEvents: Record<string, EventType>,
  lang: string[],
): Promise<Record<string, EventType>> => {
  const events: Record<string, EventType> = {};
  await Promise.all(
    Object.entries(sources).map(async ([name, source]) =>
      readers[name].readAllClasses(source.allClasses).then((body) => {
        const $ = load(body);
        $("a").each((_, element) => {
          const a = $(element);
          const href = a.prop("href");
          if (href && href.endsWith("Event.html")) {
            const eventName = href
              .substring(0, href.length - 5)
              .split("/")
              .pop();
            const sourceType = getSourceType(href);
            if (sourceType) {
              if (!source.downloadSources.includes(sourceType)) return;
              if (!events[eventName + sourceType]) {
                const lastEvent = lastEvents[eventName + sourceType];
                events[eventName + sourceType] = {
                  deprecateDescription: {
                    ...Object.fromEntries(lang.map((key) => [key, ""])),
                    ...(lastEvent && lastEvent.deprecateDescription),
                  },
                  description: {
                    ...Object.fromEntries(lang.map((key) => [key, ""])),
                    ...(lastEvent && lastEvent.description),
                  },
                  href: href,
                  link: source.javadocUrl + href,
                  name: eventName || "",
                  source: sourceType,
                };
              }
            } else {
              console.error(`Not found source type: ${href}`);
            }
          }
        });
      }),
    ),
  );
  await excludeEvents(events);
  await applyToSources(events, readers);
  return events;
};

const readExcludeEvents = async (): Promise<string[]> => {
  const text = await readFile("../../data/excludeEvents.json", "utf8");
  return JSON.parse(text);
};

const excludeEvents = async (sources: Record<string, EventType>) => {
  const events = await readExcludeEvents();
  events.forEach((eventName) => {
    delete sources[eventName];
  });
};

const applyToSources = (
  sources: Record<string, EventType>,
  readers: Record<string, SourceReader>,
) => {
  return Promise.all(
    Object.values(sources).map(async (eventType) => {
      const sourceName = getNameFromSourceType(eventType.source);
      const body = await readers[sourceName].readPage(eventType.href);
      try {
        const $ = load(body);
        const [descriptionSelector, typeSignatureSelector] =
          getJavadocSelectors($);
        const javadoc = $(`${descriptionSelector} .block`).text();
        if (javadoc) {
          eventType.javadoc = javadoc;
        } else {
          const legacyJavadoc = $(`${descriptionSelector} > .block`).text();
          if (legacyJavadoc) {
            eventType.javadoc = legacyJavadoc;
          } else {
            delete eventType.javadoc;
          }
        }
        const abstract = $(`${descriptionSelector} ${typeSignatureSelector}`)
          .text()
          .includes("abstract");
        if (abstract) {
          eventType.abstract = true;
        }
        const annotations = $(
          `${descriptionSelector} ${typeSignatureSelector} .annotations`,
        ).text();
        if (annotations.includes("@Deprecated")) {
          eventType.deprecate = "@Deprecated";
        } else if (annotations.includes("@Experimental")) {
          eventType.deprecate = "@Experimental";
        } else if (annotations.includes("@Beta")) {
          eventType.deprecate = "@Beta";
        } else {
          delete eventType.deprecate;
          delete eventType.deprecateDescription;
        }
      } catch (e) {
        console.error(e);
      }
    }),
  );
};

const resolveAllClassesPath = async (name: string, preferred: string) => {
  const candidates = [preferred, ...allClassesCandidates].filter(
    (value, index, self) => self.indexOf(value) === index,
  );
  for (const candidate of candidates) {
    const candidatePath = javadocPath([name, candidate].join("/"));
    try {
      await access(candidatePath);
      return candidatePath;
    } catch {}
  }
  throw new Error(`All classes file not found for ${name}`);
};

const resolveAllClassesBody = async (rootUrl: string, preferred: string) => {
  const candidates = [preferred, ...allClassesCandidates].filter(
    (value, index, self) => self.indexOf(value) === index,
  );
  for (const candidate of candidates) {
    try {
      const response = await axios.get<string>(
        new URL(candidate, rootUrl).toString(),
        {
          responseType: "text",
        },
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch {}
  }
  throw new Error(`All classes file not found for ${rootUrl}`);
};

const prepareSourceReader = async (
  multiProgress: MultiProgress,
  name: string,
  source: Source,
): Promise<SourceReader> => {
  if (source.location.kind === "remote") {
    const { rootUrl } = source.location;
    return {
      readAllClasses: (preferred: string) =>
        resolveAllClassesBody(rootUrl, preferred),
      readPage: async (href: string) => {
        const response = await axios.get<string>(
          new URL(href, rootUrl).toString(),
          { responseType: "text" },
        );
        return response.data;
      },
    };
  }
  await downloadArtifact(
    multiProgress,
    name,
    source.location.artifact,
    javadocPath(`${name}.jar`),
    source.location.repository,
  );
  await zip.uncompress(javadocPath(`${name}.jar`), javadocPath(name));
  return {
    readAllClasses: (preferred: string) =>
      resolveAllClassesPath(name, preferred).then((filePath) =>
        readFile(filePath, "utf8"),
      ),
    readPage: (href: string) =>
      readFile(javadocPath([name, href].join("/")), "utf8"),
  };
};

const getJavadocSelectors = ($: ReturnType<typeof load>) => {
  if ($("#class-description").length > 0) {
    return ["#class-description", ".type-signature"] as const;
  }
  return [".description", "pre"] as const;
};

const getNameFromSourceType = (type: SourceType) => {
  switch (type) {
    case "spigot":
      return "Spigot";
    case "paper":
      return "Paper";
    case "purpur":
      return "Purpur";
    case "bungee":
      return "Bungee";
    case "velocity":
      return "Velocity";
  }
};

export default downloadLatestEvents;
