import EventList from "~/components/events/EventList";
import Header from "~/components/header/Header";
import Footer from "~/components/footer/Footer";

export default function Index() {
  return (
    <>
      <Header />
      <main class="overflow-auto">
        <EventList />
      </main>
      <Footer />
    </>
  );
}
