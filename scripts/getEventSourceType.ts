import EventSourceType from "../src/EventSourceType";

/**
 * href に対応する EventSourceType を取得する
 */
const getEventSourceType = (href: string): EventSourceType | null => {
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
    return null;
  }
};

export default getEventSourceType;
