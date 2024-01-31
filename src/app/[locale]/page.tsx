import EventList from "@/components/event-list";
import { splitTags } from "@/libs/event-source-tag";

export default function Page({
  searchParams,
}: {
  searchParams: { tags?: string };
}) {
  return (
    <main className="w-full max-w-screen-sm mx-auto py-4 px-2">
      <EventList tags={splitTags(searchParams.tags ?? "")} />
    </main>
  );
}
