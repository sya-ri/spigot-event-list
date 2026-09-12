import { NextRequest, NextResponse } from "next/server";
import {
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
  resolveServerVersion,
} from "@/libs/data-paths";
import { toEventResponse } from "@/libs/event-response";

type VersionEventsDependencies = {
  getLatestMinecraftVersion: typeof getLatestMinecraftVersion;
  getServerVersionsDesc: typeof getServerVersionsDesc;
  readLatestServerEvents: typeof readLatestServerEvents;
  readProxyEvents: typeof readProxyEvents;
  readServerEvents: typeof readServerEvents;
};

export const createVersionEventsHandler =
  (dependencies: VersionEventsDependencies) =>
  async (
    request: NextRequest,
    { params }: { params: Promise<{ version: string }> },
  ) => {
    const { version } = await params;
    const [availableVersions, latestMinecraftVersion] = await Promise.all([
      dependencies.getServerVersionsDesc(),
      dependencies.getLatestMinecraftVersion(),
    ]);
    const versionResolution = resolveServerVersion(
      version,
      availableVersions,
      latestMinecraftVersion,
    );
    if (!versionResolution) {
      return new NextResponse(`Unsupported version: ${version}`, {
        status: 404,
      });
    }
    const isLatest = versionResolution.resolvedVersion === "latest";
    const serverData = isLatest
      ? await dependencies.readLatestServerEvents()
      : await dependencies.readServerEvents(versionResolution.resolvedVersion);
    const proxyData = isLatest ? null : await dependencies.readProxyEvents();
    const lang = request.nextUrl.searchParams.get("lang") ?? "ja";
    if (!serverData.lang.includes(lang)) {
      return new NextResponse(`Unsupported lang: ${lang}`, {
        status: 400,
      });
    }
    return NextResponse.json(
      [...serverData.events, ...(proxyData?.events ?? [])]
        .sort(
          (a, b) =>
            a.name.localeCompare(b.name) || a.source.localeCompare(b.source),
        )
        .map((event) => toEventResponse(event, lang)),
    );
  };

export const versionEvents = createVersionEventsHandler({
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
});
