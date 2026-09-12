"use client";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { FiPlus, FiX, FiCheck, FiCopy, FiExternalLink } from "react-icons/fi";
import { TbRobotFace } from "react-icons/tb";
import { BsTranslate } from "react-icons/bs";
import { Locale } from "@/i18n/config";
import { translate } from "@/i18n/translation";
import useLocale from "@/i18n/use-locale";
import SwitchThemeButton from "./switch-theme-button";
import { KoFiButton } from "./ko-fi-button";

const AI_SKILL_BANNER_DISMISSED_KEY = "spigot-event-list.ai-skill.dismissed";
const AI_SKILL_GH_LABEL = "GitHub CLI";
const AI_SKILL_SKILLS_LABEL = "vercel-labs/skills";
const BANNER_EVENT = "ai-skill-banner-change";
let memoryDismissed = false;
const subscribeBannerDismissed = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(BANNER_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(BANNER_EVENT, callback);
  };
};
const getBannerDismissedSnapshot = () => {
  try {
    return (
      (window.localStorage.getItem(AI_SKILL_BANNER_DISMISSED_KEY) ??
        String(memoryDismissed)) === "true"
    );
  } catch {
    return memoryDismissed;
  }
};
const updateBannerDismissed = (dismissed: boolean) => {
  memoryDismissed = dismissed;
  try {
    window.localStorage.setItem(
      AI_SKILL_BANNER_DISMISSED_KEY,
      String(dismissed),
    );
  } catch {
    /* Keep controls usable when storage is unavailable. */
  }
  window.dispatchEvent(new Event(BANNER_EVENT));
};

export default function SiteFooter() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const currentYear = new Date().getFullYear();
  const dismissed = useSyncExternalStore(
    subscribeBannerDismissed,
    getBannerDismissedSnapshot,
    () => null,
  );
  const aiSkillHydrated = dismissed !== null;
  const aiSkillBannerDismissed = dismissed;
  const closeAiSkillBanner = () => updateBannerDismissed(true);
  const [copiedCommand, setCopiedCommand] = useState<"gh" | "skills" | null>(
    null,
  );
  const [copyError, setCopyError] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  const copyCommand = async (kind: "gh" | "skills", value: string) => {
    clearTimeout(copyTimer.current);
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCommand(kind);
      copyTimer.current = setTimeout(() => setCopiedCommand(null), 1500);
    } catch {
      setCopiedCommand(null);
      setCopyError(true);
    }
  };
  return (
    <>
      <aside
        aria-label={translate(locale, "AiSkillTitle")}
        className="w-full max-w-4xl mx-auto"
      >
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
                  {copyError && (
                    <p role="alert" className="text-error mt-2 text-sm">
                      {translate(locale, "AiSkillCopyFailed")}
                    </p>
                  )}
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
                              : translate(locale, "AiSkillCopy")
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
                              : translate(locale, "AiSkillCopy")
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
      </aside>
      <footer className="bottom-0 sticky z-20 bg-base-300 border-base-content/10">
        <div className="w-full max-w-screen-sm mx-auto p-1">
          <div className="flex justify-around gap-2 items-center">
            <div className="dropdown dropdown-hover dropdown-top">
              <button
                type="button"
                aria-label={translate(locale, "Language")}
                className="btn btn-square btn-ghost"
              >
                <BsTranslate className="size-5" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-10 menu p-2 shadow bg-base-200 rounded-box w-64"
              >
                {Locale.map((l) => (
                  <li key={l}>
                    <a
                      href={`/${l}${searchParams.size ? `?${searchParams}` : ""}`}
                      lang={l}
                      hrefLang={l}
                    >
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
      </footer>
    </>
  );
}
