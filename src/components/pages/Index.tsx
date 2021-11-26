import React, { FC, useEffect, useRef, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import { getEvents } from "../../api";
import { allEventSourceTypes } from "../../EventSourceType";
import EventType from "../../EventType";
import EventList from "../parts/EventList";
import Footer from "../parts/Footer";
import Header from "../parts/Header";

const Index: FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  useEffect(() => {
    getEvents().then((response) => setEvents(response.data));
  }, []);
  const [searchText, setSearchText] = useState("");
  const [tagsFilter, setTagsFilter] = useState(allEventSourceTypes);
  const headerRef = useRef<HTMLDivElement>(null);
  return (
    <Box>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        tagsFilter={tagsFilter}
        setTagsFilter={setTagsFilter}
        headerRef={headerRef}
      />
      <Container maxW="container.md" my={2} minH="100vh">
        <EventList
          events={events}
          searchText={searchText}
          tagsFilter={tagsFilter}
          headerRef={headerRef}
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
