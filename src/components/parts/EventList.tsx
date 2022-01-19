import React, { FC } from "react";
import { Box, Container } from "@chakra-ui/react";
import EventSourceType from "../../EventSourceType";
import EventType from "../../EventType";
import EventListContent from "./EventListContent";

type Props = {
  events: EventType[];
  searchText: string;
  tagsFilter: EventSourceType[];
};

const EventList: FC<Props> = ({ events, searchText, tagsFilter }) => {
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
            {tagsFilter.includes(source) &&
            (!searchText || name.match(new RegExp(searchText, "i"))) ? (
              <EventListContent
                name={name}
                link={link}
                source={source}
                description={description}
                deprecate={deprecate}
                deprecateDescription={deprecateDescription}
              />
            ) : (
              <></>
            )}
          </Box>
        )
      )}
    </Container>
  );
};

export default EventList;
