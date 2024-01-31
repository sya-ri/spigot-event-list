import EventList from "@/components/event-list";
import { splitTags } from "@/libs/event-source-tag";
import { FaFaucet } from "react-icons/fa";
import Link from "next/link";
import EventSource from "@/types/event-source";
import SelectableSourceTag from "@/components/selectable-source-tag";

export default function Page({
  searchParams,
}: {
  searchParams: { tags?: string };
}) {
  return [
    <header className="bg-base-300 top-0 sticky shadow-lg">
      <div className="w-full max-w-screen-md mx-auto p-2">
        <div className="flex justify-between items-center flex-col md:flex-row gap-2">
          <div>
            <Link href="/" className="flex items-center mx-auto">
              <FaFaucet className="size-8 mr-2 fill-current" />
              <h1 className="font-bold text-2xl">Spigot Event List</h1>
            </Link>
          </div>
          <div className="my-auto flex flex-col gap-2">
            <input
              type="text"
              className="input input-bordered"
              placeholder="イベント名・説明文で検索"
            />
            <div className="flex gap-1 mx-auto flex-wrap">
              {EventSource.map((source) => (
                <SelectableSourceTag key={source} source={source} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>,
    <main className="w-full max-w-screen-sm mx-auto py-4 px-2">
      <EventList tags={splitTags(searchParams.tags ?? "")} />
    </main>,
  ];
}
