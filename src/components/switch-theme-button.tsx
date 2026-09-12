"use client";

import { useTheme } from "next-themes";
import React from "react";
import useLocale from "@/i18n/use-locale";
import { translate } from "@/i18n/translation";
import { BiMoon, BiSun } from "react-icons/bi";

const SwitchThemeButton = () => {
  const locale = useLocale();
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label={translate(locale, "ToggleTheme")}
      className="btn btn-square btn-ghost theme-toggle"
      onClick={() => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme") === "dark"
            ? "dark"
            : "light";
        setTheme(currentTheme === "dark" ? "light" : "dark");
      }}
    >
      <BiMoon className="theme-toggle-moon size-5" />
      <BiSun className="theme-toggle-sun size-5" />
    </button>
  );
};

export default SwitchThemeButton;
