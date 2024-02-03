import events from "@data/events.json";
import { NextResponse } from "next/server";
import { map, pick, pipe } from "remeda";

export const GET = () => {
  return NextResponse.json(
    pipe(
      events,
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
    ),
  );
};
