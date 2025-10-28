"use client";

import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { FC, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { omit } from "remeda";
import { translate } from "@/i18n/translation";
import { Locale } from "@/i18n/config";

export type SearchBoxProps = {
  locale: Locale;
  search: string;
  setSearch: (value: string) => void;
};

const SearchBox: FC<SearchBoxProps> = ({ locale, search, setSearch }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <div className="join w-full">
      <input
        type="text"
        className="input w-full join-item px-2"
        placeholder={translate(locale, "SearchByNameOrDescription")}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            ref.current?.click();
          }
        }}
      />
      <Link
        ref={ref}
        href={{
          pathname,
          query: {
            ...omit(Object.fromEntries(searchParams.entries()), ["search"]),
            ...(search ? { search } : {}),
          },
        }}
        className="btn join-item"
      >
        <BiSearch className="size-4" />
      </Link>
    </div>
  );
};

export default SearchBox;
