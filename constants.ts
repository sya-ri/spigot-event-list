export const JavaDocUrl = "https://papermc.io/javadocs/paper/1.16/";
export const AllClassesNoFrame = "allclasses-noframe.html";
export const EventsYaml = "events.yaml";
export const OutputTemplateFileName = "README-template.md";
export const OutputFileName = "README.md";
export const DoNotEditMessage = `<!--

自動生成です。直接編集せず、README-template.md を編集してください。

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
