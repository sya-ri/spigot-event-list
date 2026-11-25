import {
  readEventData,
  localizeEvent,
  compareEvents,
  type EventDataDependencies,
} from "@spigot-event-list/catalog/event-data";

export const createVersionEventsHandler =
  (dependencies: EventDataDependencies) => async (request: Request, version: string) => {
    const data = await readEventData(version, dependencies);
    if (!data)
      return new Response(`Unsupported version: ${version}`, {
        status: 404,
      });
    const lang = new URL(request.url).searchParams.get("lang") ?? "ja";
    if (!data.lang.includes(lang))
      return new Response(`Unsupported lang: ${lang}`, { status: 400 });
    return Response.json(
      [...data.events].sort(compareEvents).map((event) => localizeEvent(event, lang)),
    );
  };
