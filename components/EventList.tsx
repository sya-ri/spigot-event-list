import { Box, Container } from "@chakra-ui/react";
import React, { FC, memo, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EventType from "../lib/EventType";
import EventListContent from "./EventListContent";

type Props = {
  events: EventType[];
};

const EventList: FC<Props> = ({ events }) => {
  const [renderEvents, setRenderEvents] = useState<EventType[]>(
    events.slice(0, initialEventListSize())
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    setRenderEvents(events.slice(0, initialEventListSize()));
  }, [events]);
  return (
    <Container px={[0, 2]}>
      <InfiniteScroll
        dataLength={renderEvents.length}
        hasMore={true}
        loader={<></>}
        next={() => {
          const start = renderEvents.length;
          setRenderEvents([
            ...renderEvents,
            ...events.slice(start, start + 10),
          ]);
        }}
      >
        {renderEvents.map(
          ({
            name,
            link,
            source,
            description,
            abstract,
            deprecate,
            deprecateDescription,
          }) => (
            <EventListContent
              key={name + source}
              abstract={abstract}
              deprecate={deprecate}
              deprecateDescription={deprecateDescription}
              description={description}
              link={link}
              name={name}
              source={source}
            />
          )
        )}
      </InfiniteScroll>
    </Container>
  );
};

const EventListContentHeight = 72; // 71.93px

const initialEventListSize = () => window.innerHeight / EventListContentHeight;

export default memo(
  EventList,
  ({ events: prevEvents }, { events: nextEvents }) => {
    if (prevEvents.length != nextEvents.length) return false;
    return JSON.stringify(prevEvents) == JSON.stringify(nextEvents);
  }
);
