"use client";

import Link from "next/link";
import { FaFaucet } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import clsx from "clsx";
import SearchBox from "./search-box";
import SelectableSourceTag from "./selectable-source-tag";
import EventList from "./event-list";
import SiteFooter from "./site-footer";
import EventSource from "@/types/event-source";
import { translate } from "@/i18n/translation";
import useLocale from "@/i18n/use-locale";
import useVersions from "@/libs/hooks/use-versions";
import { useEventFilters } from "@/libs/hooks/use-event-filters";

export default function EventListPage() {
  const locale = useLocale();
  const { search, tags, version, setSearch, setTags, setVersion, reset } =
    useEventFilters();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    versions,
    error: versionsError,
    retry: retryVersions,
  } = useVersions();
  const versionOptions = Array.from(
    new Set(["latest", ...(versions ?? []), version]),
  );

  return (
    <>
      <a
        href="#event-results"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 btn"
      >
        {translate(locale, "SkipToResults")}
      </a>
      <header className="z-10 bg-base-300 top-0 sticky border-base-content/10">
        <div className="w-full max-w-4xl mx-auto p-2">
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-1.5 shrink-0"
            >
              <FaFaucet className="size-6 fill-current" />
              <h1 className="font-bold text-xl leading-none">
                Spigot Event List
              </h1>
            </Link>
            <button
              type="button"
              className="btn btn-square btn-ghost btn-sm ml-auto md:hidden"
              aria-label={translate(locale, "Filters")}
              aria-expanded={mobileMenuOpen}
              aria-controls="event-filters"
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              {mobileMenuOpen ? (
                <FiX className="size-5" />
              ) : (
                <FiMenu className="size-5" />
              )}
            </button>
            <div className="w-full min-w-0 md:w-auto md:flex-1">
              <SearchBox
                locale={locale}
                search={search}
                setSearch={setSearch}
              />
            </div>
          </div>
          <div
            id="event-filters"
            className={clsx(
              "mt-2 flex-col gap-2 md:flex md:flex-row md:items-center md:justify-between",
              mobileMenuOpen ? "flex" : "hidden",
            )}
          >
            <div
              role="group"
              aria-label={translate(locale, "Filters")}
              className="flex flex-wrap gap-1"
            >
              {EventSource.map((source) => (
                <SelectableSourceTag
                  key={source}
                  source={source}
                  tags={tags}
                  setTags={setTags}
                />
              ))}
            </div>
            <label className="flex items-center gap-2 text-xs font-medium">
              {translate(locale, "Version")}
              <select
                className="select select-bordered w-full sm:w-40 pl-4"
                value={version}
                onChange={(event) => setVersion(event.target.value)}
              >
                {versionOptions.map((candidate) => (
                  <option key={candidate} value={candidate}>
                    {candidate === "latest"
                      ? translate(locale, "Latest")
                      : candidate}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {versionsError && (
            <div role="alert" className="flex items-center gap-2 text-sm mt-2">
              <span>{translate(locale, "VersionsFailed")}</span>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => void retryVersions()}
              >
                {translate(locale, "Retry")}
              </button>
            </div>
          )}
        </div>
      </header>
      <main
        id="event-results"
        tabIndex={-1}
        className="w-full max-w-screen-sm mx-auto py-4 px-2 grow scroll-mt-40"
      >
        <EventList
          key={`${locale}|${version}|${search}|${tags.join(",")}`}
          tags={tags}
          setTags={setTags}
          search={search}
          locale={locale}
          version={version}
          resetFilters={reset}
        />
      </main>
      <SiteFooter />
    </>
  );
}
