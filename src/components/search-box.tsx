"use client";

import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { FC, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { omit } from "remeda";

export type SearchBoxProps = {
  search: string;
  setSearch: (value: string) => void;
};

const SearchBox: FC<SearchBoxProps> = ({ search, setSearch }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <div className="join w-full">
      <input
        type="text"
        className="input input-bordered w-full join-item"
        placeholder="イベント名・説明文で検索"
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
        className="btn border border-l-0 border-base-content/10 hover:border-base-content/10 join-item"
      >
        <BiSearch className="size-4" />
      </Link>
    </div>
  );
};

export default SearchBox;
