import { readFile } from "fs/promises";
import cheerio from "cheerio";
import EventSource from "../EventSource";
import { updateDeprecate } from "./deprecate";
import { excludeEvents } from "./exclude";
import { javadocPath, updateJavadoc } from "./javadoc";
import { EventType, SourceName } from 'spigot-event-list-common'

/**
 * href に対応する Index を取得する
 */
export const getSourceName = (href: string): SourceName | null => {
  if (href.startsWith("org/bukkit")) {
    return "bukkit";
  } else if (href.startsWith("org/spigotmc")) {
    return "spigot";
  } else if (href.startsWith("com/destroystokyo/paper")) {
    return "paper";
  } else if (href.startsWith("io/papermc/paper")) {
    return "paper";
  } else if (href.startsWith("org/purpurmc/purpur")) {
    return "purpur";
  } else if (href.startsWith("net/md_5/bungee/api")) {
    return "bungee";
  } else if (href.startsWith("io/github/waterfallmc/waterfall")) {
    return "waterfall";
  } else if (href.startsWith("com/velocitypowered")) {
    return "velocity";
  } else {
    return null;
  }
};

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
