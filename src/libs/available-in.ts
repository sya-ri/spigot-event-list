export const availableInSpigot = (source: string) => {
  return source == "spigot";
};

export const availableInPaper = (source: string) => {
  return source == "spigot" || source == "paper";
};

export const availableInPurpur = (source: string) => {
  return source == "spigot" || source == "paper" || source == "purpur";
};

export const availableInBungee = (source: string) => {
  return source == "bungee";
};

export const availableInWaterfall = (source: string) => {
  return source == "bungee" || source == "waterfall";
};

export const availableInVelocity = (source: string) => {
  return source == "velocity";
};
