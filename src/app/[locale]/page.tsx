import { splitTags } from "@/libs/event-source-tag";
import EventListPage from "@/components/event-list-page";

export default function Page({
  searchParams,
}: {
  searchParams: {
    tags?: string;
    search?: string;
  };
}) {
  return (
    <EventListPage
      defaultSearch={searchParams.search ?? ""}
      defaultTags={splitTags(searchParams.tags)}
    />
  );
}
