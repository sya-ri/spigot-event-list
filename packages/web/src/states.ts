import { createSignal } from "solid-js";
import { sourceNames } from "spigot-event-list-common";
import { createStore } from "solid-js/store";

export const [searchText, setSearchText] = createSignal("");

export const [filterSources, setFilterSources] = createStore(
  Object.fromEntries(sourceNames.map((source) => [source, true]))
);
