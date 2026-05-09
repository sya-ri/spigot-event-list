"use client";

import Link from "next/link";
import { FaFaucet } from "react-icons/fa";
import SearchBox from "@/components/search-box";
import EventSource from "@/types/event-source";
import SelectableSourceTag from "@/components/selectable-source-tag";
import EventList from "@/components/event-list";
import SwitchThemeButton from "@/components/switch-theme-button";
import { FC, useMemo, useState, useSyncExternalStore } from "react";
import { useEffect } from "react";
import { Locale } from "@/i18n/config";
import { BsTranslate } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { FiMenu, FiX } from "react-icons/fi";
import { FiCheck, FiCopy, FiExternalLink } from "react-icons/fi";
import { TbRobotFace } from "react-icons/tb";
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

const AI_SKILL_BANNER_DISMISSED_KEY = "spigot-event-list.ai-skill.dismissed";
const AI_SKILL_GH_LABEL = "GitHub CLI";
const AI_SKILL_SKILLS_LABEL = "vercel-labs/skills";

const subscribeHydration = () => () => {};

const subscribeBannerDismissed = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getHydrationSnapshot = () => true;
const getHydrationServerSnapshot = () => false;

const getBannerDismissedSnapshot = () =>
  window.localStorage.getItem(AI_SKILL_BANNER_DISMISSED_KEY) === "true";

const getBannerDismissedServerSnapshot = () => false;

const updateBannerDismissed = (dismissed: boolean) => {
  window.localStorage.setItem(
    AI_SKILL_BANNER_DISMISSED_KEY,
    dismissed ? "true" : "false",
  );
  window.dispatchEvent(
    new StorageEvent("storage", { key: AI_SKILL_BANNER_DISMISSED_KEY }),
  );
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<"gh" | "skills" | null>(
    null,
  );
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { versions, latestVersion } = useVersions();
  const currentYear = new Date().getFullYear();
  const aiSkillHydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getHydrationServerSnapshot,
  );
  const aiSkillBannerDismissed = useSyncExternalStore(
    subscribeBannerDismissed,
    getBannerDismissedSnapshot,
    getBannerDismissedServerSnapshot,
  );
  const versionOptions = useMemo(() => {
    const fallbackVersion = version || latestVersion || "latest";
    return versions && versions.length > 0 ? versions : [fallbackVersion];
  }, [latestVersion, version, versions]);
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

  const closeAiSkillBanner = () => updateBannerDismissed(true);

  const copyCommand = async (kind: "gh" | "skills", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedCommand(kind);
    window.setTimeout(() => {
      setCopiedCommand((current) => (current === kind ? null : current));
    }, 1500);
  };

  return [
    <header
      key="header"
      className="z-10 bg-base-300 top-0 sticky border-base-content/10"
    >
      <div className="w-full max-w-4xl mx-auto p-2">
        <div className="flex justify-between gap-3 md:hidden">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <FaFaucet className="size-8 fill-current" />
            <h1 className="font-bold text-xl leading-none">
              Spigot Event List
            </h1>
          </Link>
          <button
            type="button"
            className="btn btn-square btn-ghost btn-sm"
            aria-label="Toggle filters"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? (
              <FiX className="size-5" />
            ) : (
              <FiMenu className="size-5" />
            )}
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:gap-3">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <FaFaucet className="size-6 fill-current" />
            <h1 className="font-bold text-xl leading-none">
              Spigot Event List
            </h1>
          </Link>
          <div className="flex min-w-0 flex-1 items-end gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <SearchBox
                locale={locale}
                search={search}
                setSearch={setSearch}
              />
              <div className="flex gap-1 overflow-x-auto">
                <div className="flex min-w-max gap-1">
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
            <fieldset className="fieldset w-40 shrink-0">
              <legend className="fieldset-legend text-xs font-medium">
                {translate(locale, "Version")}
              </legend>
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
            </fieldset>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mt-2 flex flex-col gap-2 md:hidden">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0 flex-1">
                <SearchBox
                  locale={locale}
                  search={search}
                  setSearch={setSearch}
                />
              </div>
              <fieldset className="fieldset w-full sm:w-40 shrink-0">
                <legend className="fieldset-legend py-0 text-xs font-medium">
                  {translate(locale, "Version")}
                </legend>
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
              </fieldset>
            </div>
            <div className="flex flex-wrap gap-1">
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
        )}
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
        <div className="flex w-full max-w-sm flex-col items-end gap-2">
          <div className="w-full">
            {!aiSkillHydrated ? null : !aiSkillBannerDismissed ? (
              <div className="rounded-2xl border border-base-content/10 bg-base-100 p-4 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-base-200">
                        <TbRobotFace className="size-4" />
                      </span>
                      {translate(locale, "AiSkillTitle")}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost btn-xs btn-square shrink-0"
                    aria-label={translate(locale, "AiSkillClose")}
                    onClick={closeAiSkillBanner}
                  >
                    <FiX className="size-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-col gap-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2 text-sm font-semibold">
                      <div className="flex items-center gap-1">
                        <span>{AI_SKILL_GH_LABEL}</span>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href="https://cli.github.com/manual/gh_skill_install"
                          target="_blank"
                          aria-label={AI_SKILL_GH_LABEL}
                        >
                          <FiExternalLink className="size-4" />
                        </Link>
                      </div>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        aria-label={
                          copiedCommand === "gh"
                            ? translate(locale, "AiSkillCopied")
                            : AI_SKILL_GH_LABEL
                        }
                        onClick={() =>
                          copyCommand(
                            "gh",
                            "gh skill install sya-ri/spigot-event-list spigot-event-search",
                          )
                        }
                      >
                        {copiedCommand === "gh" ? (
                          <FiCheck className="size-4" />
                        ) : (
                          <FiCopy className="size-4" />
                        )}
                      </button>
                    </div>
                    <pre className="rounded-xl bg-base-200 p-3 text-sm overflow-x-auto">
                      <code>
                        gh skill install sya-ri/spigot-event-list{" "}
                        spigot-event-search
                      </code>
                    </pre>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-2 text-sm font-semibold">
                      <div className="flex items-center gap-1">
                        <span>{AI_SKILL_SKILLS_LABEL}</span>
                        <Link
                          className="btn btn-ghost btn-xs"
                          href="https://github.com/vercel-labs/skills"
                          target="_blank"
                          aria-label={AI_SKILL_SKILLS_LABEL}
                        >
                          <FiExternalLink className="size-4" />
                        </Link>
                      </div>
                      <button
                        type="button"
                        className="btn btn-ghost btn-xs"
                        aria-label={
                          copiedCommand === "skills"
                            ? translate(locale, "AiSkillCopied")
                            : AI_SKILL_SKILLS_LABEL
                        }
                        onClick={() =>
                          copyCommand(
                            "skills",
                            "npx -y skills add sya-ri/spigot-event-list --skill spigot-event-search",
                          )
                        }
                      >
                        {copiedCommand === "skills" ? (
                          <FiCheck className="size-4" />
                        ) : (
                          <FiCopy className="size-4" />
                        )}
                      </button>
                    </div>
                    <pre className="rounded-xl bg-base-200 p-3 text-sm overflow-x-auto">
                      <code>
                        npx -y skills add sya-ri/spigot-event-list --skill
                        spigot-event-search
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn btn-md btn-outline btn-square"
                  aria-label={translate(locale, "AiSkillTitle")}
                  onClick={() => updateBannerDismissed(false)}
                >
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-base-200">
                    <TbRobotFace className="size-5" />
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <KoFiButton />
          </div>
        </div>
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
                © 2020-{currentYear} sya-ri
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
