import { NextRequest, NextResponse } from "next/server";
import {
  eventDataDependencies,
  readEventData,
  localizeEvent,
  compareEvents,
  type EventDataDependencies,
} from "@/libs/event-data";

export const createVersionEventsHandler =
  (dependencies: EventDataDependencies) =>
  async (
    request: NextRequest,
    { params }: { params: Promise<{ version: string }> },
  ) => {
    const { version } = await params;
    const data = await readEventData(version, dependencies);
    if (!data)
      return new NextResponse(`Unsupported version: ${version}`, {
        status: 404,
      });
    const lang = request.nextUrl.searchParams.get("lang") ?? "ja";
    if (!data.lang.includes(lang))
      return new NextResponse(`Unsupported lang: ${lang}`, { status: 400 });
    return NextResponse.json(
      [...data.events]
        .sort(compareEvents)
        .map((event) => localizeEvent(event, lang)),
    );
  };

export const versionEvents = createVersionEventsHandler(eventDataDependencies);
