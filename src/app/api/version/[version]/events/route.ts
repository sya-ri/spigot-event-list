import { NextRequest, NextResponse } from "next/server";
import { map, pick, pipe } from "remeda";
import {
  getServerVersionsDesc,
  readProxyEvents,
  readServerEvents,
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

export const GET = async (
  request: NextRequest,
  { params }: { params: { version: string } },
) => {
  const availableVersions = await getServerVersionsDesc();
  if (!availableVersions.includes(params.version)) {
    return new NextResponse(`Unsupported version: ${params.version}`, {
      status: 404,
    });
  }
  const [serverData, proxyData] = await Promise.all([
    readServerEvents(params.version),
    readProxyEvents(),
  ]);
  const lang = request.nextUrl.searchParams.get("lang") ?? "ja";
  if (!serverData.lang.includes(lang)) {
    return new NextResponse(`Unsupported lang: ${lang}`, {
      status: 400,
    });
  }
  return NextResponse.json(
    pipe(
      [...serverData.events, ...proxyData.events],
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
        const description = (event.description as Record<string, string>)[lang];
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
