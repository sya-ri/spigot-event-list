import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import GoogleAnalytics from "../components/GoogleAnalytics";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Spigot Event List</title>
      <meta
        content="[Minecraft 1.19] Bukkit, Spigot, Paper, Purpur, BungeeCord, Waterfall, Velocity 対応のイベント一覧"
        name="description"
      />
      <GoogleAnalytics />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default App;
