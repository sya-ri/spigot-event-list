"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import React from "react";
import { BiMoon, BiSun } from "react-icons/bi";

const SwitchThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <label
      className={clsx(
        "btn btn-circle btn-ghost swap swap-rotate",
        resolvedTheme == "dark" ? "swap-active" : "",
      )}
    >
      <input
        type="checkbox"
        defaultChecked={resolvedTheme == "dark"}
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      <BiMoon className="swap-on size-5 tablet:size-6" />
      <BiSun className="swap-off size-5 tablet:size-6" />
    </label>
  );
};

export default SwitchThemeButton;
