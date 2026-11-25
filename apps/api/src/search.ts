import EventSource from "@spigot-event-list/catalog/types/source-type";
import { readEventData, type EventDataDependencies } from "@spigot-event-list/catalog/event-data";
import { searchPage } from "@spigot-event-list/catalog/search-page";

const integerParam = (value: string | null, fallback: number, min: number, max: number) => {
  const parsed = Number(value ?? fallback);
  return Number.isSafeInteger(parsed) ? Math.min(Math.max(parsed, min), max) : fallback;
};

export const createSearchEventsHandler =
  (dependencies: EventDataDependencies) => async (request: Request) => {
    const params = new URL(request.url).searchParams;
    const rawQuery = params.get("q") ?? "";
    const version = params.get("version") || "latest";
    const data = await readEventData(version, dependencies);
    if (!data)
      return new Response(`Unsupported version: ${version}`, {
        status: 404,
      });
    const lang = params.get("lang") ?? "ja";
    if (!data.lang.includes(lang))
      return new Response(`Unsupported lang: ${lang}`, { status: 400 });
    const sourceParam = params.get("source");
    const sources =
      sourceParam === null ? [...EventSource] : sourceParam.split(",").map((value) => value.trim());
    const limit = integerParam(params.get("limit"), 20, 1, 100);
    const offset = integerParam(params.get("offset"), 0, 0, Number.MAX_SAFE_INTEGER);
    return Response.json(searchPage(data.events, rawQuery, version, lang, sources, limit, offset));
  };
