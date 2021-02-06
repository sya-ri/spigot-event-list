import fs = require("fs");
import yaml = require("js-yaml");
import Handlebars = require("handlebars");
import {
  EventSources,
  EventsYaml,
  OutputReadmeFileName,
  TemplateReadmeFileName,
  OutputOnlyEventSourceFileName,
  TemplateOnlyEventSourceFileName,
  OutputOnlyDeprecateFileName,
  TemplateOnlyDeprecateFileName,
  DoNotEditMessage,
} from "./constants";

const main = () => {
  // events.yaml をロード
  const data = yaml.load(fs.readFileSync(EventsYaml, "utf8"));

  // source 毎にまとめる
  const sourceEvents = data.reduce((map, current) => {
    const element = map[current.source];
    if (element) {
      element.list.push(current);
    } else {
      map[current.source] = {
        list: [current],
      };
    }
    return map;
  }, {});

  Object.keys(sourceEvents).forEach((source) => {
    fs.writeFileSync(
      OutputOnlyEventSourceFileName.replace("{name}", source),
      DoNotEditMessage +
        Handlebars.compile(
          fs.readFileSync(TemplateOnlyEventSourceFileName, "utf8")
        )({
          name: source,
          list: sourceEvents[source].list,
        }),
      "utf8"
    );
  });

  // 非推奨イベントのみ
  fs.writeFileSync(
    OutputOnlyDeprecateFileName,
    DoNotEditMessage +
      Handlebars.compile(
        fs.readFileSync(TemplateOnlyDeprecateFileName, "utf8")
      )({
        list: data.filter((value) => value.deprecate),
      }),
    "utf8"
  );

  // テンプレートに値を当てはめて保存
  // テンプレートをロード
  fs.writeFileSync(
    OutputReadmeFileName,
    DoNotEditMessage +
      Handlebars.compile(fs.readFileSync(TemplateReadmeFileName, "utf8"))({
        list: data,
        javadoc_links: EventSources,
        deprecate_link: OutputOnlyDeprecateFileName,
        only_links: Object.keys(sourceEvents)
          .sort()
          .map((name) => {
            return {
              name: name,
              link: OutputOnlyEventSourceFileName.replace("{name}", name),
            };
          }),
      }),
    "utf8"
  );
};

main();
