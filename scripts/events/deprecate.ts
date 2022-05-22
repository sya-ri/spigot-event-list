import axios from "axios";
import cheerio from "cheerio";
import Source from "../Source";
import SourceTypeMap from "../SourceTypeMap";
import Sources from "../Sources";
import { readFile } from "../file/util";
import getSourceType from "../getSourceType";
import { javadocPath } from "./javadoc";

/**
 * 非推奨イベント一覧を更新する
 */
const updateDeprecateInternal = (
  sourceTypeMap: SourceTypeMap,
  sourceName: string,
  source: Source
) => {
  const body = readFile(
    javadocPath([sourceName, source.deprecateList].join("/"))
  );
  try {
    // sourceTypeMap から イベント一覧を作成
    const $ = cheerio.load(body);
    $("#class .col-summary-item-name a").each((_, element) => {
      const a = $(element);
      const href = a.prop("href");
      if (href && href.endsWith("Event.html")) {
        const name = href
          .substring(0, href.length - 5)
          .split("/")
          .pop();
        const source = getSourceType(href);
        if (source) {
          const sourceType = sourceTypeMap[name + source];
          if (sourceType) {
            sourceType.deprecate = true;
            if (!sourceType.deprecateDescription) {
              sourceType.deprecateDescription = "";
            }
          }
        } else {
          console.error(`${href} に対応する SourceType が見つかりませんでした`);
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
};

/**
 * 非推奨イベント一覧を更新する
 */
export const updateDeprecate = (sourceTypeMap: SourceTypeMap) => {
  Object.entries(Sources).forEach(([name, source]) =>
    updateDeprecateInternal(sourceTypeMap, name, source)
  );
};
