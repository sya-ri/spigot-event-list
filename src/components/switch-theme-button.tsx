"use client";

import { useTheme } from "next-themes";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const SwitchThemeButton = () => {
  const { setTheme } = useTheme();

  return (
    <button
      type="button"
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
