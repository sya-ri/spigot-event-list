import useSWRImmutable from "swr/immutable";
import EventSource from "@/types/event-source";

type Event = {
  name: string;
  description: string;
  link: string;
  abstract: string;
  source: EventSource;
  deprecate?: string;
  deprecateDescription?: string;
};

const useEvents = (locale: string | undefined) => {
  const { data: events } = useSWRImmutable(
    ["events", locale ?? "en"],
    ([, locale]) =>
      fetch(`/api/events?lang=${locale}`).then(
        (response) => response.json() as Promise<Event[]>,
      ),
  );
  return { events };
};

export default useEvents;
