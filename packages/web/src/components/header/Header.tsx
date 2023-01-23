import HeaderSearchBox from "~/components/header/HeaderSearchBox";
import HeaderTagsFilter from "~/components/header/HeaderTagsFilter";
import { resetFilterSources, setSearchText } from "~/states";
import { FaSolidFaucet } from "solid-icons/fa";

export default function Header() {
  return (
    <header class="sticky top-0 z-10 py-2 bg-white dark:bg-gray-800 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div class="max-w-3xl mx-auto flex flex-wrap justify-between px-4 gap-2">
        <div
          class="flex items-center shrink-0 cursor-pointer m-auto"
          onClick={() => {
            setSearchText("");
            resetFilterSources();
          }}
        >
          <FaSolidFaucet class="h-8 w-8 mr-2 fill-current" />
          <h1 class="font-bold text-2xl">Spigot Event List</h1>
        </div>
        <div class="flex flex-col gap-2 m-auto">
          <HeaderSearchBox />
          <HeaderTagsFilter />
        </div>
      </div>
    </header>
  );
}
