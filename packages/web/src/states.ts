import { createSignal } from "solid-js";
import { sourceNames } from "spigot-event-list-common";
import { createStore } from "solid-js/store";

export const [searchText, setSearchText] = createSignal("");

export const [filterSources, setFilterSources] = createStore(
  defaultFilterSources()
);

export function resetFilterSources() {
  setFilterSources(defaultFilterSources);
}

function defaultFilterSources() {
  return Object.fromEntries(sourceNames.map((source) => [source, true]));
}
