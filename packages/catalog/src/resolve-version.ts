export type ServerVersionResolution = {
  requestedVersion: string;
  resolvedVersion: string;
};

export const resolveServerVersion = (
  requestedVersion: string,
  availableVersions: readonly string[],
  latestMinecraftVersion: string | null,
): ServerVersionResolution | null => {
  if (requestedVersion === "latest" || requestedVersion === latestMinecraftVersion) {
    return { requestedVersion, resolvedVersion: "latest" };
  }
  if (availableVersions.includes(requestedVersion)) {
    return { requestedVersion, resolvedVersion: requestedVersion };
  }
  return null;
};
