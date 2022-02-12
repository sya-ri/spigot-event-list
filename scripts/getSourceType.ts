import SourceType from "../lib/SourceType";

/**
 * href に対応する SourceType を取得する
 */
const getSourceType = (href: string): SourceType | null => {
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
  } else if (href.startsWith("com/velocitypowered")) {
    return "velocity";
  } else {
    return null;
  }
};

export default getSourceType;
