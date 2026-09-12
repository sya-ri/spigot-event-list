"use client";

import { BiSearch, BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { translate } from "@/i18n/translation";
import type { Locale } from "@/i18n/config";

type SearchBoxProps = {
  locale: Locale;
  search: string;
  setSearch: (value: string) => void;
};

const SearchBox = ({ locale, search, setSearch }: SearchBoxProps) => {
  const [draft, setDraft] = useState(search);
  const [previousSearch, setPreviousSearch] = useState(search);
  const [composing, setComposing] = useState(false);
  // Restore the input together with results when navigating Back/Forward.
  if (previousSearch !== search) {
    setPreviousSearch(search);
    setDraft(search);
  }
  useEffect(() => {
    const restoreSearch = () => {
      setDraft(new URLSearchParams(window.location.search).get("search") ?? "");
      setComposing(false);
    };
    window.addEventListener("popstate", restoreSearch);
    return () => window.removeEventListener("popstate", restoreSearch);
  }, []);
  useEffect(() => {
    if (composing || draft === search) return;
    const timer = window.setTimeout(() => setSearch(draft), 300);
    return () => window.clearTimeout(timer);
  }, [composing, draft, search, setSearch]);

  return (
    <form
      role="search"
      className="join w-full"
      onSubmit={(event) => {
        event.preventDefault();
        if (!composing) setSearch(draft);
      }}
    >
      <input
        type="search"
        className="input min-w-0 w-full join-item px-2"
        aria-label={translate(locale, "SearchByNameOrDescription")}
        placeholder={translate(locale, "SearchByNameOrDescription")}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(event) => {
          setDraft(event.currentTarget.value);
          setComposing(false);
        }}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            (event.nativeEvent.isComposing || event.keyCode === 229)
          )
            event.preventDefault();
        }}
      />
      {draft && (
        <button
          type="button"
          className="btn join-item px-2"
          aria-label={translate(locale, "ClearSearch")}
          onClick={() => {
            setDraft("");
            setSearch("");
          }}
        >
          <BiX className="size-5" />
        </button>
      )}
      <button
        type="submit"
        className="btn join-item"
        aria-label={translate(locale, "Search")}
      >
        <BiSearch className="size-4" />
      </button>
    </form>
  );
};

export default SearchBox;
