import requestPromise, { RequestPromise } from "request-promise";
import EventSource from "./EventSource";
import EventSourceMap from "./EventSourceMap";

export const EventSources: EventSourceMap = {
  Paper: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["bukkit", "spigot", "paper"],
    downloadUrl: "https://papermc.io/downloads#Paper-1.17",
    javadocUrl: "https://papermc.io/javadocs/paper/1.17/",
    updateVersion: (source: EventSource): RequestPromise =>
      requestPromise(
        "https://papermc.io/api/v2/projects/paper/versions/1.17.1/",
        (e, response, body) => {
          const json = JSON.parse(body);
          source.version = "#" + json.builds.pop();
        }
      ),
  },
  Purpur: {
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    downloadSources: ["purpur"],
    downloadUrl: "https://purpur.pl3x.net/downloads/#1.17.1",
    javadocUrl: "https://purpur.pl3x.net/javadoc/",
    updateVersion: (source: EventSource): RequestPromise =>
      requestPromise(
        "https://api.pl3x.net/v2/purpur/1.17.1/",
        (e, response, body) => {
          const json = JSON.parse(body);
          source.version = "#" + json.builds.latest;
        }
      ),
  },
};
export const DataYamlName = "data.yaml";
export const TemplateReadmeFileName = "template/README.md";
export const OutputReadmeFileName = "README.md";
export const TemplateOnlyEventSourceFileName = "template/only-source.md";
export const OutputOnlyEventSourceFileName = "only-{name}.md";
export const TemplateOnlyDeprecateFileName = "template/only-deprecate.md";
export const OutputOnlyDeprecateFileName = "only-deprecate.md";
export const DoNotEditMessage = `<!--

自動生成です。直接編集しないでください。

-->
`;

export const getEventSource = (href: string): string => {
  if (href.startsWith("org/bukkit")) {
    return "bukkit";
  } else if (href.startsWith("org/spigotmc")) {
    return "spigot";
  } else if (href.startsWith("com/destroystokyo/paper")) {
    return "paper";
  } else if (href.startsWith("io/papermc/paper")) {
    return "paper";
  } else if (href.startsWith("net/pl3x/purpur")) {
    return "purpur";
  } else {
    return "";
  }
};
