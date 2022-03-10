import { AppProps } from "next/app";
import Chakra from "../components/Chakra";
import GoogleAnalytics from "../components/GoogleAnalytics";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Spigot Event List</title>
      <meta
        content="[Minecraft 1.18.2] Bukkit, Spigot, Paper, Purpur, BungeeCord, Waterfall, Velocity 対応のイベント一覧"
        name="description"
      />
      <GoogleAnalytics />
      <Chakra cookies={pageProps.cookies}>
        <Component {...pageProps} />
      </Chakra>
    </>
  );
}

export default App;
