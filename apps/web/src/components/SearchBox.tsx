import { BiSearch, BiX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { translate } from "../lib/translation";
import type { Locale } from "../lib/locale";

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
      className="search-form"
      onSubmit={(event) => {
        event.preventDefault();
        if (!composing) setSearch(draft);
      }}
    >
      <input
        type="search"
        name="search"
        autoComplete="off"
        spellCheck={false}
        className="query"
        aria-label={translate(locale, "SearchByNameOrDescription")}
        placeholder={locale === "ja" ? "名前・説明・キーワード" : "Name, description, or keyword"}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onCompositionStart={() => setComposing(true)}
        onCompositionEnd={(event) => {
          setDraft(event.currentTarget.value);
          setComposing(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (composing || event.nativeEvent.isComposing))
            event.preventDefault();
        }}
      />
      {draft && (
        <button
          type="button"
          className="icon-button"
          aria-label={translate(locale, "ClearSearch")}
          onClick={() => {
            setDraft("");
            setSearch("");
          }}
        >
          <BiX aria-hidden="true" />
        </button>
      )}
      <button type="submit" className="submit-search" aria-label={translate(locale, "Search")}>
        <BiSearch aria-hidden="true" />
      </button>
    </form>
  );
};

export default SearchBox;
