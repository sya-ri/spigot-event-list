import MultiProgress from "multi-progress";
import { mkdir, readFile, rm } from "fs/promises";
import { zip } from "compressing";
import path from "path";
import { downloadArtifact } from "./maven";
import { getSourceType, Source } from "./sources/sources";
import EventType from "./types/event-type";
import { load } from "cheerio";
import SourceType from "./types/source-type";

const javadocPath = (filename: string) => path.join("javadoc", filename);

const downloadLatestEvents = async (
  sources: Record<string, Source>,
): Promise<[string[], Record<string, EventType>]> => {
  await downloadJavadoc(sources);
  const [lang, lastEvents] = await getLastEvents();
  return [lang, await getLatestEvents(sources, lastEvents, lang)];
};

const downloadJavadoc = async (sources: Record<string, Source>) => {
  console.info("Download Javadoc:");
  const multiProgress = new MultiProgress();
  await rm(javadocPath(""), { recursive: true, force: true });
  await mkdir(javadocPath(""));
  return await Promise.all(
    Object.entries(sources).map(([name, source]) =>
      downloadArtifact(
        multiProgress,
        name,
        source.artifact,
        javadocPath(`${name}.jar`),
        source.repository,
      ).then(() =>
        zip.uncompress(javadocPath(`${name}.jar`), javadocPath(name)),
      ),
    ),
  );
};

const getLastEvents = async (): Promise<
  [string[], Record<string, EventType>]
> => {
  const text = await readFile("../../data/events.json", "utf8");
  const data: { lang: string[]; events: EventType[] } = await JSON.parse(text);
  return [
    data.lang,
    Object.fromEntries(
      data.events.map((event) => [event.name + event.source, event]),
    ),
  ];
};

const getLatestEvents = async (
  sources: Record<string, Source>,
  lastEvents: Record<string, EventType>,
  lang: string[],
): Promise<Record<string, EventType>> => {
  const events: Record<string, EventType> = {};
  await Promise.all(
    Object.entries(sources).map(([name, source]) =>
      readFile(javadocPath([name, source.allClasses].join("/"))).then(
        (body) => {
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
                  let description = Object.fromEntries(
                    lang.map((key) => [key, ""]),
                  );
                  let deprecateDescription = Object.fromEntries(
                    lang.map((key) => [key, ""]),
                  );
                  if (lastEvent) {
                    description = {
                      ...description,
                      ...lastEvent.description,
                    };
                    deprecateDescription = {
                      ...deprecateDescription,
                      ...lastEvent.deprecateDescription,
                    };
                  }
                  events[eventName + sourceType] = {
                    deprecateDescription: deprecateDescription,
                    description: description,
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
        },
      ),
    ),
  );
  await excludeEvents(events);
  await applyToSources(events);
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

const applyToSources = (sources: Record<string, EventType>) => {
  return Promise.all(
    Object.values(sources).map(async (eventType) => {
      const sourceName = getNameFromSourceType(eventType.source);
      const body = await readFile(
        javadocPath([sourceName, eventType.href].join("/")),
      );
      try {
        const $ = load(body);
        let descriptionSelector: string;
        let typeSignatureSelector: string;

        switch (eventType.source) {
          case "spigot":
          case "paper":
          case "purpur":
          case "velocity":
          case "bungee":
            descriptionSelector = "#class-description";
            typeSignatureSelector = ".type-signature";
            break;
        }
        const javadoc = $(`${descriptionSelector} .block`).text();
        if (javadoc) {
          eventType.javadoc = javadoc;
        } else {
          delete eventType.javadoc;
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
