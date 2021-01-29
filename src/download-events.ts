import request = require("request");
import cheerio = require("cheerio");
import fs = require("fs");
import yaml = require("js-yaml");
import {
  JavaDocUrl,
  AllClassesHtml,
  EventsYaml,
  getEventSource,
} from "./constants";

const main = () => {
  request(JavaDocUrl + AllClassesHtml, function (e, response, body) {
    if (e) {
      console.error(e);
    }

    try {
      // javadoc から イベント一覧を作成
      const $ = cheerio.load(body);
      const events = [];
      $("a").each(function (_, element) {
        const a = $(element);
        const href = a.prop("href");
        if (href.endsWith("Event.html")) {
          events.push({
            name: href
              .substring(0, href.length - 5)
              .split("/")
              .pop(),
            link: JavaDocUrl + href,
            source: getEventSource(href),
          });
        }
      });

      // 前回のデータをロード
      const lastData = yaml.load(fs.readFileSync(EventsYaml, "utf8"));
      const lastEvents = lastData.reduce((map, value) => {
        map[value.name] = value;
        return map;
      }, {});

      // 取得したイベント一覧からデータを作成
      const data = events.map((event) => {
        let description = "";
        const lastEvent = lastEvents[event.name];
        if (lastEvent) {
          description = lastEvent.description;
        }
        return {
          name: event.name,
          link: event.link,
          source: event.source,
          description: description,
        };
      });

      // データを並び替え
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });

      // イベント数を出力
      console.log(`総イベント数: ${data.length}`);
      console.log(
        `説明が書かれていないイベント数: ${
          data.filter((value) => !value.description).length
        }`
      );

      // events.yaml に保存
      fs.writeFile(
        EventsYaml,
        yaml.dump(data, {
          lineWidth: 200,
        }),
        "utf8",
        (err) => {
          if (err) {
            console.error(err.message);
          }
        }
      );
    } catch (e) {
      console.error(e);
    }
  });
};

main();
