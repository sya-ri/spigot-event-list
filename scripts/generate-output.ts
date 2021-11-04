import Handlebars from "handlebars";
import {
  EventSources,
  OutputReadmeFileName,
  TemplateReadmeFileName,
  OutputOnlyEventSourceFileName,
  TemplateOnlyEventSourceFileName,
  OutputOnlyDeprecateFileName,
  TemplateOnlyDeprecateFileName,
} from "./constants";
import Event from "./Event";
import { readDataYamlFile, readFile, writeAutoGenerateFile } from "./util";

const main = () => {
  // data.yaml をロード
  const data = readDataYamlFile();

  // イベントソースのバージョンを更新
  for (const [name, source] of Object.entries(EventSources)) {
    source.version = data.versions[name];
  }

  // source 毎にまとめる
  const sourceEvents = data.events.reduce((map, current) => {
    const element = map[current.source];
    if (element) {
      element.push(current);
    } else {
      map[current.source] = [current];
    }
    return map;
  }, {} as { [name: string]: Event[] });

  // イベントソース毎イベント一覧
  Object.keys(sourceEvents).forEach((source) => {
    writeAutoGenerateFile(
      OutputOnlyEventSourceFileName.replace("{name}", source),
      Handlebars.compile(readFile(TemplateOnlyEventSourceFileName))({
        list: sourceEvents[source],
        name: source,
      })
    );
  });

  // 非推奨イベントのみ
  writeAutoGenerateFile(
    OutputOnlyDeprecateFileName,
    Handlebars.compile(readFile(TemplateOnlyDeprecateFileName))({
      list: data.events.filter((value) => value.deprecate),
    })
  );

  // 全てのイベント
  writeAutoGenerateFile(
    OutputReadmeFileName,
    Handlebars.compile(readFile(TemplateReadmeFileName))({
      deprecate_link: OutputOnlyDeprecateFileName,
      javadoc_links: EventSources,
      list: data.events,
      only_links: Object.keys(sourceEvents)
        .sort()
        .map((name) => ({
          link: OutputOnlyEventSourceFileName.replace("{name}", name),
          name: name,
        })),
    })
  );
};

main();
