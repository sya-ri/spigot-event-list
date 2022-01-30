import React, { FC, memo } from "react";
import { Box, Container } from "@chakra-ui/react";
import EventType from "../../EventType";
import EventListContent from "./EventListContent";

type Props = {
  events: EventType[];
};

const EventList: FC<Props> = ({ events }) => {
  return (
    <Container px={[0, 2]}>
      {events.map(
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
