import React, { FC, memo, useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import EventType from "../../EventType";
import EventListContent from "./EventListContent";

type Props = {
  events: EventType[];
};

const EventList: FC<Props> = ({ events }) => {
  const [renderEvents, setRenderEvents] = useState<EventType[]>(
    events.slice(0, 10)
  );
  useEffect(() => {
    window.scroll({ behavior: "auto", top: 0 });
    setRenderEvents(events.slice(0, 10));
  }, [events]);
  return (
    <Container px={[0, 2]}>
      <InfiniteScroll
        next={() => {
          const start = renderEvents.length - 1;
          setRenderEvents([
            ...renderEvents,
            ...events.slice(start, start + 10),
          ]);
        }}
        hasMore={true}
        loader={<></>}
        dataLength={renderEvents.length}
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
                name={name}
                link={link}
                source={source}
                description={description}
                deprecate={deprecate}
                deprecateDescription={deprecateDescription}
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
