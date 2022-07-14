import { Box, Container } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { EventType, SourceName, sourceNames } from "spigot-event-list-common";
import Events from "../../data/events.json"; // TODO from を修正する
import Versions from "../../data/versions.json";
import EventList from "../components/EventList";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Index: NextPage = () => {
  const { query, isReady } = useRouter();
  const [searchText, setSearchText] = useState("");
  const [tagsFilter, setTagsFilter] = useState(sourceNames);
  useEffect(() => {
    if (isReady) {
      setSearchText(first(query.search) || "");
      const tags = first(query.tags)?.split("-");
      setTagsFilter(tags ? (tags as SourceName[]) : sourceNames);
    }
  }, [isReady, query.search, query.tags]);
  useEffect(() => {
    if (isReady) {
      const paramsArray: string[][] = [];
      if (searchText) {
        paramsArray.push(["search", searchText]);
      }
      if (!sourceNames.every((t) => tagsFilter.includes(t))) {
        paramsArray.push(["tags", tagsFilter.join("-")]);
      }
      const path = window.location.pathname;
      const params = paramsArray.length
        ? "?" + new URLSearchParams(paramsArray).toString()
        : "";
      const hash = window.location.hash;
      window.history.replaceState(null, "", path + params + hash);
    }
  }, [searchText, tagsFilter]); // eslint-disable-line react-hooks/exhaustive-deps
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
      {Object.entries(Versions).map(([name, version]) => (
        <meta key={name} content={version} name={`version:${name}`} />
      ))}
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
