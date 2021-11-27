import axios from "axios";
import cheerio from "cheerio";
import EventSource from "../EventSource";
import EventSources from "../EventSources";
import EventTypeMap from "../EventTypeMap";
import getEventSourceType from "../getEventSourceType";

/**
 * 非推奨イベント一覧を更新する
 */
const updateDeprecateInternal = (
  events: EventTypeMap,
  eventSource: EventSource
): Promise<void> =>
  axios
    .get<string>(eventSource.javadocUrl + eventSource.deprecateList)
    .then((response) => {
      const body = response.data;
      try {
        // events から イベント一覧を作成
        const $ = cheerio.load(body);
        $("#class .col-deprecated-item-name a").each((_, element) => {
          const a = $(element);
          const href = a.prop("href");
          if (href.endsWith("Event.html")) {
            const name = href
              .substring(0, href.length - 5)
              .split("/")
              .pop();
            const source = getEventSourceType(href);
            if (source) {
              const event = events[name + source];
              if (event) {
                event.deprecate = true;
                if (!event.deprecateDescription) {
                  event.deprecateDescription = "";
                }
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
 * 非推奨イベント一覧を更新する
 */
export const updateDeprecate = async (eventMap: EventTypeMap) => {
  await Promise.all(
    Object.values(EventSources).map((source) =>
      updateDeprecateInternal(eventMap, source)
    )
  );
};
