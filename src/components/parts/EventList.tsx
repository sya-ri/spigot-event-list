import React, { FC, memo, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroller";
import EventType from "../../EventType";
import EventListContent from "./EventListContent";

type Props = {
  events: EventType[];
};

const EventList: FC<Props> = ({ events }) => {
  const [renderEvents, setRenderEvents] = useState<EventType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loadMore = (page: number) => {
    if (events.length <= page) {
      setHasMore(false);
    } else {
      setRenderEvents([...renderEvents, events[page]]);
    }
  };
  return (
    <Container px={[0, 2]}>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} pageStart={-1}>
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
