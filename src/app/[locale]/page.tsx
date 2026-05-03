import { splitTags } from "@/libs/event-source-tag";
import EventListPage from "@/components/event-list-page";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    tags?: string;
    search?: string;
    version?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  return (
    <EventListPage
      defaultSearch={resolvedSearchParams.search ?? ""}
      defaultTags={splitTags(resolvedSearchParams.tags)}
      defaultVersion={resolvedSearchParams.version ?? "latest"}
    />
  );
}
