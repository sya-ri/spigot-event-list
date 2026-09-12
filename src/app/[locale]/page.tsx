import { Suspense } from "react";
import EventListPage from "@/components/event-list-page";

export default function Page() {
  return (
    <Suspense>
      <EventListPage />
    </Suspense>
  );
}
