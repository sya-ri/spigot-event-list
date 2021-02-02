import requestPromise = require("request-promise");
import cheerio = require("cheerio");
import fs = require("fs");
import yaml = require("js-yaml");
import { EventSources, EventsYaml, getEventSource } from "./constants";
import { Event, EventSource } from "./data-class";

async function downloadEvents(
  events: { string: Event },
  eventSource: EventSource
) {
  return requestPromise(
    eventSource.javadocUrl + eventSource.allClasses,
    function (e, response, body) {
      if (e) {
        console.error(e);
      }

      try {
        // javadoc から イベント一覧を作成
        const $ = cheerio.load(body);
        $("a").each(function (_, element) {
          const a = $(element);
          const href = a.prop("href");
          if (href.endsWith("Event.html")) {
            const name = href
              .substring(0, href.length - 5)
              .split("/")
              .pop();
            const source = getEventSource(href);
            const event = events[name + source];
            if (!event) {
              events[name + source] = {
                name: name,
                link: eventSource.javadocUrl + href,
                source: source,
                description: "",
              };
            }
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  );
}

function updateClassType(events: { string: Event }, eventSource: EventSource) {
  return requestPromise(
    eventSource.javadocUrl + eventSource.deprecated,
    function (e, response, body) {
      if (e) {
        console.error(e);
      }

      try {
        // javadoc から イベント一覧を作成
        const $ = cheerio.load(body);
        $(".deprecatedSummary").each((_, element) => {
          const deprecatedType = $(element).children("caption").text();
          if (deprecatedType.startsWith("Classes")) {
            const classes = $(element).find(".colDeprecatedItemName a");
            classes.each((_, element) => {
              const a = $(element);
              const href = a.prop("href");
              if (href.endsWith("Event.html")) {
                const name = href
                  .substring(0, href.length - 5)
                  .split("/")
                  .pop();
                const source = getEventSource(href);
                const event = events[name + source];
                if (event) {
                  event.deprecated = true;
                  if (!event.deprecateMessage) {
                    event.deprecateMessage = "";
                  }
                }
              }
            });
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
  );
}

const main = async () => {
  // 前回のデータをロード
  const lastData = yaml.load(fs.readFileSync(EventsYaml, "utf8"));
  const eventMap = lastData.reduce((map, value) => {
    map[value.name + value.source] = value;
    delete value.deprecated;
    return map;
  }, {});

  // イベントをダウンロード
  for (const source of EventSources) {
    await downloadEvents(eventMap, source);
  }

  // イベントが非推奨かどうかを取得
  for (const source of EventSources) {
    await updateClassType(eventMap, source);
  }

  // データを並び替え
  const events = Object.keys(eventMap)
    .sort()
    .map(
      (key): Event => {
        const value = eventMap[key];
        return {
          name: value.name,
          link: value.link,
          source: value.source,
          description: value.description,
          deprecated: value.deprecated,
          deprecateMessage: value.deprecateMessage,
        };
      }
    );

  // イベント数を出力
  console.log(`総イベント数: ${events.length}`);
  console.log(
    `説明が書かれていないイベント数: ${
      events.filter((value) => !value.description).length
    }`
  );
  console.log(
    `非推奨イベント数: ${events.filter((value) => value.deprecated).length}`
  );
  console.log(
    `非推奨についての説明が書かれていないイベント数: ${
      events.filter((value) => value.deprecateMessage == "").length
    }`
  );

  // events.yaml に保存
  fs.writeFile(
    EventsYaml,
    yaml.dump(events, {
      lineWidth: 200,
    }),
    "utf8",
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );
};

main();
