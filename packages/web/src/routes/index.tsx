import EventList from "~/components/events/EventList";
import Header from "~/components/header/Header";
import Footer from "~/components/footer/Footer";

export default function Index() {
  return (
    <>
      <Header />
      <main class="min-h-screen mx-2">
        <EventList />
      </main>
      <Footer />
    </>
  );
}
