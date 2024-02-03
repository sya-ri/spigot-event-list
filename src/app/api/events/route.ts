import data from "@data/events.json";
import { NextRequest, NextResponse } from "next/server";
import { map, pick, pipe } from "remeda";

export const GET = (request: NextRequest) => {
  const lang = request.nextUrl.searchParams.get("lang") ?? "ja";
  if (!data.lang.includes(lang)) {
    return new NextResponse(`Unsupported lang: ${lang}`, {
      status: 400,
    });
  }
  return NextResponse.json(
    pipe(
      data.events,
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
      map(({ description, deprecateDescription, ...event }) => ({
        description: (description as Record<string, string>)[lang],
        ...(deprecateDescription && {
          deprecateDescription: (
            deprecateDescription as Record<string, string>
          )[lang],
        }),
        ...event,
      })),
    ),
  );
};
