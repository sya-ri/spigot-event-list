import type { Metadata } from "next";
import { M_PLUS_1p } from "next/font/google";
import "../globals.css";
import { ReactNode } from "react";
import Providers from "@/components/providers";
import clsx from "clsx";

const font = M_PLUS_1p({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spigot Event List",
  description:
    "Event list for Minecraft plugins (Bukkit, Spigot, Paper, Purpur, Bungee, Waterfall, Velocity)",
};

export default function Layout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={params.locale}>
      <body className={clsx(font.className, "flex min-h-screen flex-col")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
