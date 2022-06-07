import { readFile } from "fs/promises";
import cheerio from "cheerio";
import EventType from "../../scripts/EventType";
import EventSource from "../EventSource";
import { getSourceName } from "../SourceName";
import { updateJavadoc } from "../javadoc/updateJavadoc";
import { updateDeprecate } from "./deprecate";
import { excludeEvents } from "./exclude";
import { javadocPath } from "./javadoc";

/**
 * 最新のイベント一覧を取得する
 */
export const getLatestEvents = async (
  sources: { [name: string]: EventSource },
  lastEvents: {
    [name: string]: EventType;
  }
): Promise<{ [name: string]: EventType }> => {
  const events: { [name: string]: EventType } = {};
  await Promise.all(
    Object.entries(sources).map(([name, source]) =>
      readFile(javadocPath([name, source.allClasses].join("/"))).then(
        (body) => {
          try {
            // events から イベント一覧を作成
            const $ = cheerio.load(body);
            $("a").each((_, element) => {
              const a = $(element);
              const href = a.prop("href");
              if (href && href.endsWith("Event.html")) {
                const eventName = href
                  .substring(0, href.length - 5)
                  .split("/")
                  .pop();
                const sourceType = getSourceName(href);
                if (sourceType) {
                  if (!source.downloadSources.includes(sourceType)) return;
                  if (!events[eventName + sourceType]) {
                    const lastEvent = lastEvents[eventName + sourceType];
                    let description = "";
                    let deprecateDescription;
                    if (lastEvent) {
                      description = lastEvent.description;
                      deprecateDescription = lastEvent.deprecateDescription;
                    }
                    events[eventName + sourceType] = {
                      deprecateDescription: deprecateDescription || "",
                      description: description,
                      href: href,
                      link: source.javadocUrl + href,
                      name: eventName || "",
                      source: sourceType,
                    };
                  }
                } else {
                  console.error(
                    `${href} に対応する SourceType が見つかりませんでした`
                  );
                }
              }
            });
          } catch (e) {
            console.error(e);
          }
        }
      )
    )
  );
  await excludeEvents(events);
  await updateJavadoc(events);
  await updateDeprecate(sources, events);
  return events;
};
