// @refresh reload
import { Links, Meta, Routes, Scripts } from "solid-start/root";
import { ErrorBoundary } from "solid-start/error-boundary";
import { Suspense } from "solid-js";
import { createStatesEffect, isDarkMode } from "~/states";
import "./index.css";

export default function Root() {
  createStatesEffect();
  return (
    <html lang="ja" class={`h-full ${isDarkMode() ? "dark" : ""}`}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#606060" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta content="#ffffff" name="theme-color" />

        {/* Open Graph https://www.opengraph.xyz/ */}
        <meta content="https://spigot-event-list.s7a.dev/" property="og:url" />
        <meta content="website" property="og:type" />
        <meta content="Spigot Event List" property="og:title" />
        <meta
          content="[Minecraft 1.19] Bukkit, Spigot, Paper, Purpur, BungeeCord, Waterfall, Velocity 対応のイベント一覧"
          property="og:title"
        />
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
          content="https://spigot-event-list.s7a.dev//logo.png"
          name="twitter:image"
        />
        <Meta />
        <Links />
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-60WKT971SW"
          strategy="afterInteractive"
        />
        <script defer id="ga" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());    
            gtag('config', 'G-EJ15BC1R3Q');
        `}
        </script>
      </head>
      <body class="dark:text-white dark:bg-gray-800 h-full">
        <ErrorBoundary>
          <Suspense>
            <Routes />
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
