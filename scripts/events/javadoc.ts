import { mkdir, readFile, rm } from "fs/promises";
import * as path from "path";
import cheerio from "cheerio";
import { zip } from "compressing";
import EventSource from "../EventSource";
import EventType from "../EventType";
import SourceName from "../SourceName";
import downloadArtifact from "../mvn/downloadArtifact";

/**
 * ファイルパスを取得する
 *
 * @param filename　ファイル名
 */
export const javadocPath = (filename: string) => path.join("javadoc", filename);

/**
 * Javadoc をダウンロードする
 */
export const downloadJavadoc = (sources: { [name: string]: EventSource }) =>
  rm(javadocPath(""), { recursive: true, force: true })
    .then(() => mkdir(javadocPath("")))
    .then(() =>
      Promise.all(
        Object.entries(sources).map(([name, source]) =>
          downloadArtifact(
            source.artifact,
            javadocPath(`${name}.jar`),
            source.repository
          )
            .then(() =>
              zip.uncompress(javadocPath(`${name}.jar`), javadocPath(name))
            )
            .catch((err) => console.error(err))
        )
      )
    );

const getSourceNameFromType = (type: SourceName) => {
  switch (type) {
    case "bukkit":
    case "spigot":
    case "paper":
      return "Paper";
    case "purpur":
      return "Purpur";
    case "bungee":
      return "Bungee";
    case "waterfall":
      return "Waterfall";
    case "velocity":
      return "Velocity";
  }
};

export const updateJavadoc = (sources: { [name: string]: EventType }) => {
  return Promise.all(
    Object.values(sources).map((eventType) => {
      const sourceName = getSourceNameFromType(eventType.source);
      return readFile(javadocPath([sourceName, eventType.href].join("/"))).then(
        (body) => {
          try {
            const $ = cheerio.load(body);
            switch (eventType.source) {
              case "bukkit":
              case "spigot":
              case "paper":
              case "purpur":
              case "velocity":
                eventType.javadoc = $("#class-description .block").text();
                if (
                  $("#class-description .modifiers").text().includes("abstract")
                ) {
                  eventType.abstract = true;
                }
                break;
              case "bungee":
              case "waterfall":
                eventType.javadoc = $(".description .block").text();
                if ($(".description .modifiers").text().includes("abstract")) {
                  eventType.abstract = true;
                }
                break;
            }
            if (!eventType.javadoc) {
              delete eventType.javadoc;
            }
          } catch (e) {
            console.error(e);
          }
        }
      );
    })
  );
};
