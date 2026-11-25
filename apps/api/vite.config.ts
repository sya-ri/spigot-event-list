import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  publicDir: "../web/dist",
  plugins: [cloudflare()],
});
