import { readFile } from "fs/promises";
import cheerio from "cheerio";
import EventSource from "../EventSource.js";
import { getSourceName } from "./events.js";
import { javadocPath } from "./javadoc.js";
import { EventType } from "~/types.js";

/**
 * 非推奨イベント一覧を更新する
 */
export const updateDeprecate = (
  sources: { [name: string]: EventSource },
  sourceTypes: {
    [name: string]: EventType;
  },
) => {
  return Promise.all(
    Object.entries(sources).map(([name, source]) =>
      readFile(javadocPath([name, source.deprecateList].join("/"))).then(
        (body) => {
          try {
            // sourceTypes から イベント一覧を作成
            const $ = cheerio.load(body);
            $("#class .col-summary-item-name a").each((_, element) => {
              const a = $(element);
              const href = a.prop("href");
              if (href && href.endsWith("Event.html")) {
                const name = href
                  .substring(0, href.length - 5)
                  .split("/")
                  .pop();
                const source = getSourceName(href);
                if (source) {
                  const sourceType = sourceTypes[name + source];
                  if (sourceType) {
                    sourceType.deprecate = true;
                    if (!sourceType.deprecateDescription) {
                      sourceType.deprecateDescription = "";
                    }
                  }
                } else {
                  console.error(
                    `${href} に対応する SourceType が見つかりませんでした`,
                  );
                }
              }
            });
          } catch (e) {
            console.error(e);
          }
        },
      ),
    ),
  );
};
