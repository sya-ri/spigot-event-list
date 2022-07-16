import EventList from "~/components/events/EventList";
import Header from "~/components/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <EventList />
      </main>
    </>
  );
}
