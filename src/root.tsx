// @refresh reload
import {
  Link,
  Meta,
  Title,
  Html,
  Head,
  Routes,
  Scripts,
  Body,
  FileRoutes,
  ErrorBoundary,
} from "solid-start";
import { Suspense } from "solid-js";
import { createStatesEffect, isDarkMode } from "~/states";
import "./index.css";

export default function Root() {
  createStatesEffect();
  return (
    <Html lang="ja" class={isDarkMode() ? "dark" : ""}>
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Title>Spigot Event List</Title>
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <Link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <Link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <Link href="/site.webmanifest" rel="manifest" />
        <Link color="#606060" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <Meta content="#ffffff" name="msapplication-TileColor" />
        <Meta content="#ffffff" name="theme-color" />

        {/* Open Graph https://www.opengraph.xyz/ */}
        <Meta content="https://spigot-event-list.s7a.dev/" property="og:url" />
        <Meta content="website" property="og:type" />
        <Meta content="Spigot Event List" property="og:title" />
        <Meta
          content="[Minecraft 1.19] Bukkit, Spigot, Paper, Purpur, BungeeCord, Waterfall, Velocity 対応のイベント一覧"
          property="og:description"
        />
        <Meta
          content="https://spigot-event-list.s7a.dev/logo.png"
          property="og:image"
        />
        <Meta content="1200" property="og:image:width" />
        <Meta content="630" property="og:image:height" />
        <Meta content="summary_large_image" name="twitter:card" />
        <Meta content="@sya_ri_dayo" name="twitter:site" />
        <Meta content="Spigot Event List" name="twitter:title" />
        <Meta
          content="https://spigot-event-list.s7a.dev//logo.png"
          name="twitter:image"
        />
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-60WKT971SW"
          // strategy="afterInteractive"
        />
        <script
          defer
          id="ga"
          // strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());    
            gtag('config', 'G-EJ15BC1R3Q');
        `}
        </script>
        <script>
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "kc3em5faum");
          `}
        </script>
      </Head>
      <Body class="dark:text-white dark:bg-gray-800">
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
