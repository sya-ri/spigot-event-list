import fs = require("fs");
import yaml = require("js-yaml");
import Handlebars = require("handlebars");
import {
  OutputFileName,
  OutputTemplateFileName,
  EventsYaml,
  DoNotEditMessage,
  JavaDocUrl,
} from "./constants";

const main = () => {
  // events.yaml をロード
  const data = yaml.load(fs.readFileSync(EventsYaml, "utf8"));

  // テンプレートをロード
  const template = Handlebars.compile(
    fs.readFileSync(OutputTemplateFileName, "utf8")
  );

  // テンプレートに値を当てはめて保存
  fs.writeFileSync(
    OutputFileName,
    DoNotEditMessage +
      template({
        javadoc: JavaDocUrl,
        list: data,
      }),
    "utf8"
  );
};

main();
