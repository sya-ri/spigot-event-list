import { NextResponse } from "next/server";
import {
  getLatestMinecraftVersion,
  getServerVersionsDesc,
} from "@/libs/data-paths";

type VersionsDependencies = {
  getLatestMinecraftVersion: typeof getLatestMinecraftVersion;
  getServerVersionsDesc: typeof getServerVersionsDesc;
};

export const createVersionsHandler =
  (dependencies: VersionsDependencies) => async () => {
    const [versions, latestMinecraftVersion] = await Promise.all([
      dependencies.getServerVersionsDesc(),
      dependencies.getLatestMinecraftVersion(),
    ]);
    return NextResponse.json({
      latest: "latest",
      latestMinecraftVersion,
      versions: Array.from(
        new Set([
          "latest",
          ...(latestMinecraftVersion ? [latestMinecraftVersion] : []),
          ...versions,
        ]),
      ),
    });
  };

export const versionsResponse = createVersionsHandler({
  getLatestMinecraftVersion,
  getServerVersionsDesc,
});
