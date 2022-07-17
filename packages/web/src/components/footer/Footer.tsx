// import { BiArrowToTop, BiSun } from "solid-icons/bi"; FIXME

export default function Footer() {
  return (
    <footer class="sticky bottom-0 py-1 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1),0_-2px_4px_-1px_rgba(0,0,0,0.06)]">
      <div class="md:max-w-xl mx-auto flex justify-around items-center">
        <button
          class="bg-white hover:bg-gray-200 active:bg-gray-300 rounded-full p-2"
          onClick={() => window.scroll({ behavior: "smooth", top: 0 })}
        >
          👆{/* <BiArrowToTop class="h-6 w-6" /> FIXME */}
        </button>
        <a
          href="https://github.com/sya-ri/spigot-event-list"
          target="_blank"
          rel="noopener"
          class="hover:underline"
        >
          <p class="font-semibold">©︎ 2021 sya_ri</p>
        </a>
        <button class="bg-white hover:bg-gray-200 active:bg-gray-300 rounded-full p-2">
          ☀️{/* <BiSun class="h-6 w-6" /> FIXME */}
        </button>
      </div>
    </footer>
  );
}
