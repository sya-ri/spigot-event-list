import { Box, Container } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { FC, useEffect, useMemo, useState } from "react";
import EventList from "../components/EventList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Events from "../events.json";
import EventSourceType, { allEventSourceTypes } from "../lib/EventSourceType";
import EventType from "../lib/EventType";

interface Props {
  searchText: string;
  tagsFilter: EventSourceType[];
}

const Index: NextPage<Props> = ({ searchText, tagsFilter }) => {
  const [_searchText, setSearchText] = useState(searchText);
  const [_tagsFilter, setTagsFilter] = useState(tagsFilter);
  useEffect(() => {
    const paramsArray: string[][] = [];
    if (_searchText) {
      paramsArray.push(["search", _searchText]);
    }
    if (!allEventSourceTypes.every((t) => _tagsFilter.includes(t))) {
      paramsArray.push(["tags", _tagsFilter.join("-")]);
    }
    const path = window.location.pathname;
    const params = paramsArray.length
      ? "?" + new URLSearchParams(paramsArray).toString()
      : "";
    const hash = window.location.hash;
    window.history.pushState(null, "", path + params + hash);
  }, [_searchText, _tagsFilter]);
  const events = useMemo(() => {
    return (Events as EventType[]).filter(
      ({ name, source }) =>
        _tagsFilter.includes(source) &&
        (!_searchText || name.match(new RegExp(_searchText, "i")))
    );
  }, [_searchText, _tagsFilter]);
  return (
    <Box>
      <Header
        searchText={_searchText}
        setSearchText={setSearchText}
        setTagsFilter={setTagsFilter}
        tagsFilter={_tagsFilter}
      />
      <Container maxW="container.md" minH="100vh" my={2}>
        <EventList events={events} />
      </Container>
      <Footer />
    </Box>
  );
};

Index.getInitialProps = async function ({ res }) {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const searchText = params.get("search") || "";
    const tags = params.get("tags")?.split("-");
    const tagsFilter = tags ? (tags as EventSourceType[]) : allEventSourceTypes;
    return { searchText, tagsFilter };
  }
  return {
    searchText: "",
    tagsFilter: allEventSourceTypes,
  };
};

export default Index;
