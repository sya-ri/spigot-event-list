import { EventSource } from "./data-class";

export const EventSources: EventSource[] = [
  {
    javadocUrl: "https://papermc.io/javadocs/paper/1.16/",
    downloadUrl: "https://papermc.io/downloads#Paper-1.16",
    allClasses: "allclasses-noframe.html",
    version: "#455",
  },
];
export const EventsYaml = "events.yaml";
export const TemplateReadmeFileName = "template/README-template.md";
export const OutputReadmeFileName = "README.md";
export const TemplateOnlyEventSourceFileName =
  "template/only-source-template.md";
export const OutputOnlyEventSourceFileName = "only-{name}.md";
export const DoNotEditMessage = `<!--

自動生成です。直接編集しないでください。

-->
`;

export function getEventSource(href: string): string {
  if (href.startsWith("org/bukkit")) {
    return "bukkit";
  } else if (href.startsWith("org/spigotmc")) {
    return "spigot";
  } else if (href.startsWith("com/destroystokyo/paper")) {
    return "paper";
  } else if (href.startsWith("io/papermc/paper")) {
    return "paper";
  }
}
