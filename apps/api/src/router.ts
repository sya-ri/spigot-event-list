import type { EventDataDependencies } from "@spigot-event-list/catalog/event-data";
import { createSearchEventsHandler } from "./search.ts";
import { createVersionsHandler } from "./versions.ts";
import { createVersionEventsHandler } from "./events.ts";

function preferredLocale(request: Request) {
  const stored = /(?:^|;\s*)NEXT_LOCALE=(ja|en)(?:;|$)/.exec(request.headers.get("cookie") ?? "");
  if (stored) return stored[1];
  const languages = (request.headers.get("accept-language") ?? "").split(",").map((entry) => {
    const [tag, weight] = entry.trim().split(/;\s*q=/i);
    return {
      lang: tag.toLowerCase().split("-")[0],
      weight: weight === undefined ? 1 : Number(weight),
    };
  });
  return (
    languages
      .filter((item) => ["ja", "en"].includes(item.lang) && item.weight > 0)
      .sort((a, b) => b.weight - a.weight)[0]?.lang ?? "en"
  );
}

export function createRouter(data: EventDataDependencies) {
  const versions = createVersionsHandler(data);
  const search = createSearchEventsHandler(data);
  const events = createVersionEventsHandler(data);
  return async (request: Request): Promise<Response | undefined> => {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";
    if (path !== "/" && !path.startsWith("/api/")) return undefined;
    if (request.method !== "GET" && request.method !== "HEAD")
      return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
    if (path === "/") {
      url.pathname = "/" + preferredLocale(request);
      return new Response(null, {
        status: 307,
        headers: {
          Location: url.href,
          Vary: "Accept-Language, Cookie",
          "Cache-Control": "private, no-store",
        },
      });
    }
    const versionMatch = /^\/api\/versions\/([^/]+)\/events$/.exec(path);
    let response: Response;
    if (path === "/api/versions") response = await versions();
    else if (path === "/api/search/events") response = await search(request);
    else if (versionMatch) response = await events(request, versionMatch[1]);
    else response = new Response("Not found", { status: 404 });
    return request.method === "HEAD" ? new Response(null, response) : response;
  };
}
