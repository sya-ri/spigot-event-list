"use client";

import Link from "next/link";
import { FaFaucet } from "react-icons/fa";
import SearchBox from "@/components/search-box";
import EventSource from "@/types/event-source";
import SelectableSourceTag from "@/components/selectable-source-tag";
import EventList from "@/components/event-list";
import SwitchThemeButton from "@/components/switch-theme-button";
import { FC, useMemo, useState } from "react";
import { useEffect } from "react";
import { Locale } from "@/i18n/config";
import { BsTranslate } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { translate } from "@/i18n/translation";
import useLocale from "@/i18n/use-locale";
import { KoFiButton } from "@/components/ko-fi-button";
import useVersions from "@/libs/hooks/use-versions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type EventListPageProps = {
  defaultSearch: string;
  defaultTags: EventSource[];
  defaultVersion: string;
};

const EventListPage: FC<EventListPageProps> = ({
  defaultSearch,
  defaultTags,
  defaultVersion,
}) => {
  const locale = useLocale();
  const [search, setSearch] = useState(defaultSearch);
  const [tags, setTags] = useState(defaultTags);
  const [version, setVersion] = useState(defaultVersion);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { versions, latestVersion } = useVersions();
  const versionOptions = useMemo(() => {
    const fallbackVersion = version || latestVersion || "latest";
    return versions && versions.length > 0 ? versions : [fallbackVersion];
  }, [latestVersion, version, versions]);
  useEffect(() => {
    if (!version && latestVersion) {
      setVersion(latestVersion);
    }
  }, [latestVersion, version]);
  useEffect(() => {
    if (!version) {
      return;
    }
    const currentVersion = searchParams.get("version") ?? "latest";
    if (currentVersion === version) {
      return;
    }
    const nextParams = new URLSearchParams(searchParams.toString());
    if (version === "latest") {
      nextParams.delete("version");
    } else {
      nextParams.set("version", version);
    }
    const nextQuery = nextParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }, [pathname, router, searchParams, version]);
  return [
    <header
      key="header"
      className="z-10 bg-base-300 top-0 sticky border-base-content/10"
    >
      <div className="w-full max-w-screen-md mx-auto p-2">
        <div className="flex justify-between items-center flex-col md:flex-row gap-2">
          <div>
            <Link href="/" className="flex items-center mx-auto gap-1">
              <FaFaucet className="size-8 mr-2 fill-current" />
              <h1 className="font-bold text-2xl">Spigot Event List</h1>
            </Link>
          </div>
          <div className="my-auto flex w-full max-w-md flex-col gap-2">
            <SearchBox locale={locale} search={search} setSearch={setSearch} />
            <label className="form-control w-full">
              <div className="label py-0">
                <span className="label-text">
                  {translate(locale, "MinecraftVersion")}
                </span>
              </div>
              <select
                className="select select-bordered w-full pl-4"
                value={version || versionOptions[0]}
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
      <EventList
        tags={tags}
        setTags={setTags}
        search={search}
        locale={locale}
        version={version}
      />
    </main>,
    <footer key="footer" className="bottom-0 sticky z-20">
      <div className="flex justify-end mr-2 mb-2">
        <KoFiButton />
      </div>
      <div className="bg-base-300 border-base-content/10">
        <div className="w-full max-w-screen-sm mx-auto p-1">
          <div className="flex justify-around gap-2 items-center">
            <div className="dropdown dropdown-hover dropdown-top">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-square btn-ghost"
              >
                <BsTranslate className="size-5" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-2 shadow bg-base-200 rounded-box w-64"
              >
                {Locale.map((l) => (
                  <li key={l}>
                    <a href={`/${l}`}>
                      <div className="badge badge-outline">
                        {l.toUpperCase()}
                      </div>
                      <div>
                        {new Intl.DisplayNames(locale, {
                          type: "language",
                        }).of(l)}
                      </div>
                    </a>
                  </li>
                ))}
                <li className="mt-2 pt-2 border-base-content/20">
                  <Link
                    href="https://github.com/sya-ri/spigot-event-list#i18n"
                    target="_blank"
                  >
                    <FiPlus />
                    {translate(locale, "AddNewLanguage")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <Link
                className="link-hover font-bold"
                href="https://github.com/sya-ri/spigot-event-list"
              >
                © 2020-2025 sya-ri
              </Link>
            </div>
            <SwitchThemeButton />
          </div>
        </div>
      </div>
    </footer>,
  ];
};

export default EventListPage;
