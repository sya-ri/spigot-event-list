import {
  BiRegularArrowToTop,
  BiRegularSun,
  BiRegularMoon,
} from "solid-icons/bi";
import { isDarkMode, setDarkMode } from "~/states";

export default function Footer() {
  return (
    <footer class="sticky bottom-0 z-10 py-1 bg-white dark:bg-gray-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div class="max-w-xl mx-auto flex justify-around items-center">
        <button
          class="bg-white hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-full p-2"
          onClick={() => window.scroll({ behavior: "smooth", top: 0 })}
        >
          <BiRegularArrowToTop class="h-6 w-6 fill-current" />
        </button>
        <a
          href="https://github.com/sya-ri/spigot-event-list"
          target="_blank"
          rel="noopener"
          class="hover:underline"
        >
          <p class="font-semibold">©︎ 2023 sya_ri</p>
        </a>
        <button
          class="bg-white hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600 rounded-full p-2"
          onClick={() => setDarkMode(!isDarkMode())}
        >
          <BiRegularMoon
            class={`h-6 w-6 fill-current ${isDarkMode() ? "" : "hidden"}`}
          />
          <BiRegularSun
            class={`h-6 w-6 fill-current ${isDarkMode() ? "hidden" : ""}`}
          />
        </button>
      </div>
    </footer>
  );
}
