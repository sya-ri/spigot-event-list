// import { BiSearch } from "solid-icons/bi"; FIXME

import { searchText, setSearchText } from "~/states";

export default function HeaderSearchBox() {
  return (
    <div class="flex items-center">
      <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          {/* <BiSearch class="w-5 h-5" /> FIXME */}
        </div>
        <input
          type="text"
          class="w-full text-gray-900 border border-gray-300 rounded-lg pl-10 p-2"
          placeholder="イベント名で検索する"
          value={searchText()}
          onInput={({ currentTarget }) => setSearchText(currentTarget.value)}
        />
      </div>
    </div>
  );
}
