import useSWRImmutable from "swr/immutable";
import EventSource from "@/types/event-source";

type Event = {
  name: string;
  description: string;
  link: string;
  abstract: string;
  source: EventSource;
  deprecate?: boolean;
  deprecateDescription?: string;
};

const useEvents = () => {
  const { data: events } = useSWRImmutable("events", () =>
    fetch("/api/events?lang=ja").then(
      (response) => response.json() as Promise<Event[]>,
    ),
  );
  return { events };
};

export default useEvents;
