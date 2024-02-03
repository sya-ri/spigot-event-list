"use client";

import Link from "next/link";
import { FaFaucet } from "react-icons/fa";
import SearchBox from "@/components/search-box";
import EventSource from "@/types/event-source";
import SelectableSourceTag from "@/components/selectable-source-tag";
import EventList from "@/components/event-list";
import ScrollToTopButton from "@/components/scroll-to-top-button";
import SwitchThemeButton from "@/components/switch-theme-button";
import { FC, useState } from "react";

export type EventListPageProps = {
  defaultSearch: string;
  defaultTags: EventSource[];
};

const EventListPage: FC<EventListPageProps> = ({
  defaultSearch,
  defaultTags,
}) => {
  const [search, setSearch] = useState(defaultSearch);
  const [tags, setTags] = useState(defaultTags);
  return [
    <header
      key="header"
      className="bg-base-300 top-0 sticky border-b border-base-content/10"
    >
      <div className="w-full max-w-screen-md mx-auto p-2">
        <div className="flex justify-between items-center flex-col md:flex-row gap-2">
          <div>
            <Link href="/" className="flex items-center mx-auto gap-1">
              <FaFaucet className="size-8 mr-2 fill-current" />
              <h1 className="font-bold text-2xl">Spigot Event List</h1>
            </Link>
          </div>
          <div className="my-auto flex flex-col gap-2">
            <SearchBox search={search} setSearch={setSearch} />
            <div className="flex gap-1 mx-auto flex-wrap justify-center">
              {EventSource.map((source) => (
                <SelectableSourceTag
                  key={source}
                  source={source}
                  tags={tags}
                  setTags={setTags}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>,
    <main key="main" className="w-full max-w-screen-sm mx-auto py-4 px-2 grow">
      <EventList tags={tags} setTags={setTags} search={search} />
    </main>,
    <footer
      key="footer"
      className="bg-base-300 bottom-0 sticky border-t border-base-content/10"
    >
      <div className="w-full max-w-screen-sm mx-auto p-1">
        <div className="flex justify-around gap-2 items-center">
          <ScrollToTopButton />
          <div>
            <Link
              className="link-hover font-bold"
              href="https://github.com/sya-ri/spigot-event-list"
            >
              © 2024 sya-ri
            </Link>
          </div>
          <SwitchThemeButton />
        </div>
      </div>
    </footer>,
  ];
};

export default EventListPage;
