import axios from "axios";
import cheerio from "cheerio";
import EventType from "../../lib/EventType";
import Source from "../Source";
import SourceTypeMap from "../SourceTypeMap";
import Sources from "../Sources";
import { readFile } from "../file/util";
import getSourceType from "../getSourceType";
import { javadocPath } from "./javadoc";

/**
 * イベント一覧を更新する
 *
 * @param events イベント一覧の出力先
 * @param lastEvents 前回のイベント一覧
 * @param sourceName イベントソース名
 * @param source 取得するイベントソース
 */
const updateEventsInternal = (
  events: { [name: string]: EventType },
  lastEvents: { [name: string]: EventType },
  sourceName: string,
  source: Source
) => {
  const body = readFile(javadocPath([sourceName, source.allClasses].join("/")));
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
        const sourceType = getSourceType(href);
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
          console.error(`${href} に対応する SourceType が見つかりませんでした`);
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
};

/**
 * イベント一覧を更新する
 *
 * @param lastEventMap 前回のイベント一覧
 */
export const updateEvents = (lastEventMap: SourceTypeMap): SourceTypeMap => {
  const sourceTypeMap: SourceTypeMap = {};
  Object.entries(Sources).forEach(([name, source]) =>
    updateEventsInternal(sourceTypeMap, lastEventMap, name, source)
  );
  return sourceTypeMap;
};
