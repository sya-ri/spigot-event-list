import { EventSource } from "./data-class";

export const EventSources: EventSource[] = [
  {
    javadocUrl: "https://papermc.io/javadocs/paper/1.16/",
    downloadUrl: "https://papermc.io/downloads#Paper-1.16",
    allClasses: "allclasses-noframe.html",
    deprecateList: "deprecated-list.html",
    version: "#545",
    downloadSources: ["bukkit", "spigot", "paper"],
  },
  {
    javadocUrl: "https://purpur.pl3x.net/javadoc/",
    downloadUrl: "https://purpur.pl3x.net/downloads/#1.16.5",
    allClasses: "allclasses-index.html",
    deprecateList: "deprecated-list.html",
    version: "#1011",
    downloadSources: ["purpur"],
  },
  {
    javadocUrl: "https://sya-ri.github.io/spigot-event-list/yatopia/",
    downloadUrl: "https://yatopiamc.org/download.html",
    allClasses: "allclasses-noframe.html",
    deprecateList: "deprecated-list.html",
    version: "#40",
    downloadSources: ["yatopia"],
  },
];
export const EventsYaml = "events.yaml";
export const ExcludeEventsYaml = "exclude-events.yaml";
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
  } else if (href.startsWith("dev/tr7zw/yatopia")) {
    return "yatopia";
  } else if (href.startsWith("net/yatopia")) {
    return "yatopia";
  }
};
