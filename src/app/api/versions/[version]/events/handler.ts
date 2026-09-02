import { NextRequest, NextResponse } from "next/server";
import { map, pick, pipe, sortBy } from "remeda";
import {
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
  resolveServerVersion,
} from "@/libs/data-paths";
import EventSource from "@/types/event-source";

type EventResponse = {
  name: string;
  description: string;
  link: string;
  abstract?: true;
  source: EventSource;
  deprecate?: string;
  deprecateDescription?: string;
};

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
      pipe(
        [...serverData.events, ...(proxyData?.events ?? [])],
        sortBy(
          [(event) => event.name, "asc"],
          [(event) => event.source, "asc"],
        ),
        map(
          pick([
            "name",
            "description",
            "link",
            "abstract",
            "source",
            "deprecate",
            "deprecateDescription",
          ]),
        ),
        map((event): EventResponse => {
          const description = (event.description as Record<string, string>)[
            lang
          ];
          const deprecateDescription = event.deprecateDescription
            ? (event.deprecateDescription as Record<string, string>)[lang]
            : undefined;
          return {
            name: event.name as string,
            description,
            link: event.link as string,
            abstract: event.abstract as true | undefined,
            source: event.source as EventSource,
            deprecate: event.deprecate as string | undefined,
            deprecateDescription,
          };
        }),
      ),
    );
  };

export const versionEvents = createVersionEventsHandler({
  getLatestMinecraftVersion,
  getServerVersionsDesc,
  readLatestServerEvents,
  readProxyEvents,
  readServerEvents,
});
