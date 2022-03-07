import cheerio from "cheerio";
import SourceType from "../../lib/SourceType";
import SourceTypeMap from "../SourceTypeMap";
import { javadocPath } from "../events/javadoc";
import { readFile } from "../file/util";

const getSourceNameFromType = (type: SourceType) => {
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

export const updateJavadoc = (sourceTypeMap: SourceTypeMap) => {
  Object.values(sourceTypeMap).forEach((eventType) => {
    const sourceName = getSourceNameFromType(eventType.source);
    const body = readFile(javadocPath([sourceName, eventType.href].join("/")));
    try {
      const $ = cheerio.load(body);
      switch (eventType.source) {
        case "bukkit":
        case "spigot":
        case "paper":
        case "purpur":
        case "velocity":
          eventType.javadoc = $("#class-description .block").text();
          break;
        case "bungee":
        case "waterfall":
          eventType.javadoc = $(".description .block").text();
          break;
      }
      if ($("#class-description .modifiers").text().includes("abstract")) {
        eventType.abstract = true;
      }
    } catch (e) {
      console.error(e);
    }
  });
};
