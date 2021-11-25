import React, { FC, useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { getEvents } from "../../api";
import { allEventSourceTypes } from "../../EventSourceType";
import EventType from "../../EventType";
import EventList from "../parts/EventList";
import Header from "../parts/Header";

const Index: FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  useEffect(() => {
    getEvents().then((response) => setEvents(response.data));
  }, []);
  const [searchText, setSearchText] = useState("");
  const [tagsFilter, setTagsFilter] = useState(allEventSourceTypes);
  return (
    <Box>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        tagsFilter={tagsFilter}
        setTagsFilter={setTagsFilter}
      />
      <Container maxW="container.md" my={2}>
        <EventList
          events={events}
          searchText={searchText}
          tagsFilter={tagsFilter}
        />
      </Container>
    </Box>
  );
};

export default Index;
