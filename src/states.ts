import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { isServer } from "solid-js/web";
import { sourceNames } from "~/types";

export const [isDarkMode, setDarkMode] = createSignal(defaultDarkMode());

function defaultDarkMode() {
  if (isServer) return false;
  if ("color-theme" in localStorage) {
    return localStorage.getItem("color-theme") === "dark";
  } else {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}

export const [searchText, setSearchText] = createSignal("");

export const [filterSources, setFilterSources] = createStore(
  defaultFilterSources(),
);

export function resetFilterSources() {
  setFilterSources(defaultFilterSources);
}

function defaultFilterSources() {
  return Object.fromEntries(sourceNames.map((source) => [source, true]));
}

function initFromSearchParams() {
  const params = new URLSearchParams(window.location.search);
  if (params.has("search")) {
    setSearchText(params.get("search"));
  }
  if (params.has("tags")) {
    const sources = params.get("tags").split("-");
    setFilterSources(
      Object.fromEntries(
        sourceNames.map((source) => [source, sources.includes(source)]),
      ),
    );
  }
}

export function createStatesEffect() {
  if (!isServer) {
    initFromSearchParams();
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
    createEffect(() => {
      localStorage.setItem("color-theme", isDarkMode() ? "dark" : "");
    });
  }
}
