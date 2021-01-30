import requestPromise = require("request-promise");
import cheerio = require("cheerio");
import fs = require("fs");
import yaml = require("js-yaml");
import { EventsYaml, getEventSource } from "./constants";

class Event {
  name: string;
  link: string;
  source: string;
  description: string;
}

async function downloadEvents(
  lastEvents: { string: Event },
  events: Event[],
  javadocUrl: string,
  allClasses: string
) {
  return requestPromise(javadocUrl + allClasses, function (e, response, body) {
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
          let description = "";
          const lastEvent = lastEvents[name];
          if (lastEvent) {
            description = lastEvent.description;
          }
          events.push({
            name: name,
            link: javadocUrl + href,
            source: getEventSource(href),
            description,
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  });
}

const main = async () => {
  // 前回のデータをロード
  const lastData = yaml.load(fs.readFileSync(EventsYaml, "utf8"));
  const lastEvents = lastData.reduce((map, value) => {
    map[value.name] = value;
    return map;
  }, {});

  const events: Event[] = [];

  // イベントをダウンロード
  await downloadEvents(
    lastEvents,
    events,
    "https://papermc.io/javadocs/paper/1.16/",
    "allclasses-noframe.html"
  );

  // データを並び替え
  events.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  // イベント数を出力
  console.log(`総イベント数: ${events.length}`);
  console.log(
    `説明が書かれていないイベント数: ${
      events.filter((value) => !value.description).length
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
