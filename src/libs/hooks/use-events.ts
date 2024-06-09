import useSWRImmutable from "swr/immutable";
import EventSource from "@/types/event-source";
import { Locale } from "@/i18n/config";

type Event = {
  name: string;
  description: string;
  link: string;
  abstract: string;
  source: EventSource;
  deprecate?: string;
  deprecateDescription?: string;
};

const useEvents = (locale: Locale) => {
  const { data: events } = useSWRImmutable(["events", locale], ([, locale]) =>
    fetch(`/api/events?lang=${locale}`).then(
      (response) => response.json() as Promise<Event[]>,
    ),
  );
  return { events };
};

export default useEvents;
