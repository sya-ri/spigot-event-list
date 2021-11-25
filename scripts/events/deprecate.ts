import cheerio from "cheerio";
import requestPromise, { RequestPromise } from "request-promise";
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
): RequestPromise<void> =>
  requestPromise(
    eventSource.javadocUrl + eventSource.deprecateList,
    (e, response, body) => {
      if (e) {
        console.error(e);
      }

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
    }
  );

/**
 * 非推奨イベント一覧を更新する
 */
export const updateDeprecate = async (eventMap: EventTypeMap) => {
  for (const source of Object.values(EventSources)) {
    await updateDeprecateInternal(eventMap, source);
  }
};
