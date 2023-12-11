import { readFile, writeFile } from "fs/promises";
import { EventType } from "~/types.js";

/**
 * イベント一覧を取得する
 */
export const getLastEvents = async (): Promise<Record<string, EventType>> => {
  const text = await readFile("data/events.json", "utf8");
  const lastEvents: EventType[] = await JSON.parse(text);
  return Object.fromEntries(
    lastEvents.map((event) => [event.name + event.source, event]),
  );
};

/**
 * イベント一覧を整形し json に出力する
 */
export const writeEvents = (sources: { [name: string]: EventType }) => {
  const events = Object.values(sources)
    .sort((a, b) => (a.name + a.source).localeCompare(b.name + b.source))
    .map(
      (value): EventType => ({
        deprecate: value.deprecate,
        deprecateDescription: value.deprecate
          ? value.deprecateDescription
          : undefined,
        description: value.description,
        abstract: value.abstract,
        href: value.href,
        javadoc: value.javadoc,
        link: value.link,
        name: value.name,
        source: value.source,
      }),
    );
  return writeFile("data/events.json", JSON.stringify(events, null, 2));
};
