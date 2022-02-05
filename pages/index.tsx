import { Box, Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useMemo, useState } from "react";
import EventList from "../components/EventList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Events from "../events.json";
import EventSourceType, { allEventSourceTypes } from "../lib/EventSourceType";
import EventType from "../lib/EventType";

const Index: NextPage = () => {
  const { query, isReady } = useRouter();
  const [searchText, setSearchText] = useState("");
  const [tagsFilter, setTagsFilter] = useState<EventSourceType[]>([]);
  useEffect(() => {
    if (isReady) {
      setSearchText(first(query.search) || "");
      const tags = first(query.tags)?.split("-");
      setTagsFilter(tags ? (tags as EventSourceType[]) : allEventSourceTypes);
    }
  }, [isReady, query.search, query.tags]);
  useEffect(() => {
    if (isReady) {
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
      window.history.replaceState(null, "", path + params + hash);
    }
  }, [searchText, tagsFilter]);
  const events = useMemo(() => {
    return (Events as EventType[]).filter(
      ({ name, source }) =>
        tagsFilter.includes(source) &&
        (!searchText || name.match(new RegExp(searchText, "i")))
    );
  }, [searchText, tagsFilter]);
  if (!isReady) return null;
  return (
    <Box>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        setTagsFilter={setTagsFilter}
        tagsFilter={tagsFilter}
      />
      <Container maxW="container.md" minH="100vh" my={2}>
        <EventList events={events} />
      </Container>
      <Footer />
    </Box>
  );
};

const first = (data: string | string[] | undefined): string | undefined => {
  if (Array.isArray(data)) return data[0];
  return data;
};

export default Index;
