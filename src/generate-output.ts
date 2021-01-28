import fs = require("fs");
import yaml = require("js-yaml");
import Handlebars = require("handlebars");
import {
  OutputReadmeFileName,
  TemplateReadmeFileName,
  EventsYaml,
  DoNotEditMessage,
  JavaDocUrl,
  OutputOnlyEventSourceFileName,
  TemplateOnlyEventSourceFileName,
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
        list: [],
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

  // テンプレートに値を当てはめて保存
  // テンプレートをロード
  fs.writeFileSync(
    OutputReadmeFileName,
    DoNotEditMessage +
      Handlebars.compile(fs.readFileSync(TemplateReadmeFileName, "utf8"))({
        javadoc: JavaDocUrl,
        list: data,
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
