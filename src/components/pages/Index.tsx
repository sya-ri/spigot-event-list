import React, { FC, useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import Events from "../../../events.json";
import EventSourceType, { allEventSourceTypes } from "../../EventSourceType";
import EventType from "../../EventType";
import EventList from "../parts/EventList";
import Footer from "../parts/Footer";
import Header from "../parts/Header";

const initSearchText = (): string => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || "";
};

const initTagsFilter = (): EventSourceType[] => {
  const params = new URLSearchParams(window.location.search);
  const tags = params.get("tags")?.split("-");
  return tags ? (tags as EventSourceType[]) : allEventSourceTypes;
};

const Index: FC = () => {
  const [searchText, setSearchText] = useState(initSearchText());
  const [tagsFilter, setTagsFilter] = useState(initTagsFilter());
  useEffect(() => {
    const paramsArray: string[][] = [];
    if (searchText) {
      paramsArray.push(["search", searchText]);
    }
    if (!allEventSourceTypes.every((t) => tagsFilter.includes(t))) {
      paramsArray.push(["tags", tagsFilter.join("-")]);
    }
    const path = window.location.pathname;
    const params = paramsArray.length
      ? "?" + new URLSearchParams(paramsArray).toString()
      : "";
    const hash = window.location.hash;
    window.history.pushState(null, "", path + params + hash);
  }, [searchText, tagsFilter]);
  return (
    <Box>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        tagsFilter={tagsFilter}
        setTagsFilter={setTagsFilter}
      />
      <Container maxW="container.md" my={2} minH="100vh">
        <EventList
          events={Events as EventType[]}
          searchText={searchText}
          tagsFilter={tagsFilter}
        />
      </Container>
      <Footer />
    </Box>
  );
};

export default Index;
