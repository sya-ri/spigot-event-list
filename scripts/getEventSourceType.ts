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
  } else if (href.startsWith("org/purpurmc/purpur")) {
    return "purpur";
  } else if (href.startsWith("net/md_5/bungee/api")) {
    return "bungee";
  } else if (href.startsWith("io/github/waterfallmc/waterfall")) {
    return "waterfall";
  } else {
    return null;
  }
};

export default getEventSourceType;
