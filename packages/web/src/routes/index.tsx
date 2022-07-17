import EventList from "~/components/events/EventList";
import Header from "~/components/header/Header";
import Footer from "~/components/footer/Footer";
import { createEffect } from "solid-js";
import {
  filterSources,
  searchText,
  setFilterSources,
  setSearchText,
} from "~/states";
import { sourceNames } from "spigot-event-list-common";
import { isServer } from "solid-js/web";

export default function Index() {
  if (!isServer) {
    const params = new URLSearchParams(window.location.search);
    if (params.has("search")) {
      setSearchText(params.get("search"));
    }
    if (params.has("tags")) {
      const sources = params.get("tags").split("-");
      setFilterSources(
        Object.fromEntries(
          sourceNames.map((source) => [source, sources.includes(source)])
        )
      );
    }
    createEffect(() => {
      const paramsArray: string[][] = [];
      const search = searchText();
      const sources = sourceNames.filter((source) => filterSources[source]);
      if (search) {
        paramsArray.push(["search", search]);
      }
      if (sourceNames.length !== Object.keys(sources).length) {
        paramsArray.push(["tags", sources.join("-")]);
      }
      const path = window.location.pathname;
      const params = paramsArray.length
        ? "?" + new URLSearchParams(paramsArray).toString()
        : "";
      const hash = window.location.hash;
      window.history.replaceState(null, "", path + params + hash);
    });
  }
  return (
    <>
      <Header />
      <main class="min-h-screen mx-2">
        <EventList />
      </main>
      <Footer />
    </>
  );
}
