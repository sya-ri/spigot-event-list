import { ColorModeScript } from "@chakra-ui/color-mode/src/color-mode-script";
import { theme } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="site.webmanifest" rel="manifest" />
          <link color="#606060" href="safari-pinned-tab.svg" rel="mask-icon" />
          <meta content="#ffffff" name="msapplication-TileColor" />
          <meta content="#ffffff" name="theme-color" />

          {/* Open Graph https://www.opengraph.xyz/ */}
          <meta content="https://spigot-event-list.s7a.dev" property="og:url" />
          <meta content="website" property="og:type" />
          <meta content="Spigot Event List" property="og:title" />
          <meta
            content="https://spigot-event-list.s7a.dev/logo.png"
            property="og:image"
          />
          <meta content="1200" property="og:image:width" />
          <meta content="630" property="og:image:height" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="@sya_ri_dayo" name="twitter:site" />
          <meta content="Spigot Event List" name="twitter:title" />
          <meta
            content="https://spigot-event-list.s7a.dev/logo.png"
            name="twitter:image"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
