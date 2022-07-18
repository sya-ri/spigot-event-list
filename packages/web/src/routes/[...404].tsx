import { BiChevronLeft, FaSolidFaucet } from "~/components/icons"; // TODO: import from "solid-icons/fa", "solid-icons/bi"
import { Link } from "solid-app-router";

export default function NotFound() {
  return (
    <main class="min-h-screen flex justify-center">
      <div class="m-auto">
        <FaSolidFaucet class="h-24 w-24 fill-current m-auto" />
        <p class="text-4xl font-bold font-mono my-8">404 Not Found</p>
        <div class="flex justify-center">
          <Link href="/">
            <button class="flex items-center p-2 rounded-lg border border-gray-800 dark:border-white bg-white hover:bg-gray-200 active:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600">
              <BiChevronLeft class="h-6 w-6 mr-1 fill-current" />
              トップに戻る
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
