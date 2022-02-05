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
    events.slice(0, 10)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    setRenderEvents(events.slice(0, 10));
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
            deprecate,
            deprecateDescription,
          }) => (
            <Box key={name + source}>
              <EventListContent
                deprecate={deprecate}
                deprecateDescription={deprecateDescription}
                description={description}
                link={link}
                name={name}
                source={source}
              />
            </Box>
          )
        )}
      </InfiniteScroll>
    </Container>
  );
};

export default memo(
  EventList,
  ({ events: prevEvents }, { events: nextEvents }) => {
    if (prevEvents.length != nextEvents.length) return false;
    return JSON.stringify(prevEvents) == JSON.stringify(nextEvents);
  }
);
