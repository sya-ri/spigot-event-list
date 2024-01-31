"use client";

import { ThemeProvider } from "next-themes";
import { FC, PropsWithChildren } from "react";

export type ProvidersProps = PropsWithChildren;

const Providers: FC<ProvidersProps> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Providers;
