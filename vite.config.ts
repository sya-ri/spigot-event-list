import { defineConfig } from "vite";
import solid from "solid-start/vite";
import vercel from "solid-start-vercel";
import node from "solid-start-node";
import * as process from "process";

export default defineConfig({
  plugins: [
    solid({ adapter: process.env["ENABLE_VC_BUILD"] ? vercel() : node() }),
  ],
});
