import axios from "axios";
import cheerio from "cheerio";
import EventType from "../../lib/EventType";
import EventSource from "../EventSource";
import EventSources from "../EventSources";
import EventTypeMap from "../EventTypeMap";
import getEventSourceType from "../getEventSourceType";

/**
 * イベント一覧をダウンロードし、更新する
 *
 * @param events イベント一覧の出力先
 * @param lastEvents 前回のイベント一覧
 * @param eventSource 取得するイベントソース
 */
const downloadEvents = (
  events: { [name: string]: EventType },
  lastEvents: { [name: string]: EventType },
  eventSource: EventSource
): Promise<void> =>
  axios
    .get<string>(eventSource.javadocUrl + eventSource.allClasses)
    .then((response) => {
      const body = response.data;
      try {
        // events から イベント一覧を作成
        const $ = cheerio.load(body);
        $("a").each((_, element) => {
          const a = $(element);
          const href = a.prop("href");
          if (href && href.endsWith("Event.html")) {
            const name = href
              .substring(0, href.length - 5)
              .split("/")
              .pop();
            const source = getEventSourceType(href);
            if (source) {
              if (!eventSource.downloadSources.includes(source)) return;
              if (!events[name + source]) {
                const lastEvent = lastEvents[name + source];
                let description = "";
                let deprecateDescription;
                if (lastEvent) {
                  description = lastEvent.description;
                  deprecateDescription = lastEvent.deprecateDescription;
                }
                events[name + source] = {
                  deprecateDescription: deprecateDescription || "",
                  description: description,
                  link: eventSource.javadocUrl + href,
                  name: name || "",
                  source: source,
                };
              }
            } else {
              console.error(
                `${href} に対応する EventSourceType が見つかりませんでした`
              );
            }
          }
        });
      } catch (e) {
        console.error(e);
      }
    })
    .catch((reason) => console.error(reason));

/**
 * イベント一覧をダウンロードし、更新する
 *
 * @param lastEventMap 前回のイベント一覧
 */
export const downloadEventMap = async (
  lastEventMap: EventTypeMap
): Promise<EventTypeMap> => {
  const eventMap: EventTypeMap = {};
  await Promise.all(
    Object.values(EventSources).map((source) =>
      downloadEvents(eventMap, lastEventMap, source)
    )
  );
  return eventMap;
};
