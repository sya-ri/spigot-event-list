import { readFile } from "fs/promises";
import cheerio from "cheerio";
import EventType from "../../scripts/EventType";
import SourceName from "../../scripts/SourceName";
import { javadocPath } from "../events/javadoc";

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
