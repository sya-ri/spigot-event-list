import type { EventDataDependencies } from "@spigot-event-list/catalog/event-data";
type VersionsDependencies = Pick<
  EventDataDependencies,
  "getLatestMinecraftVersion" | "getServerVersionsDesc"
>;

export const createVersionsHandler = (dependencies: VersionsDependencies) => async () => {
  const [versions, latestMinecraftVersion] = await Promise.all([
    dependencies.getServerVersionsDesc(),
    dependencies.getLatestMinecraftVersion(),
  ]);
  return Response.json({
    latest: "latest",
    latestMinecraftVersion,
    versions: Array.from(
      new Set(["latest", ...(latestMinecraftVersion ? [latestMinecraftVersion] : []), ...versions]),
    ),
  });
};
