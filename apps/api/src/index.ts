import { assetCatalog, type Assets } from "./assets";
import { createRouter } from "./router";

interface Env {
  ASSETS: Assets;
}
const snapshots = new Map<string, unknown>();
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const router = createRouter(assetCatalog(env.ASSETS, new URL(request.url).origin, snapshots));
    return (await router(request)) ?? env.ASSETS.fetch(request);
  },
};
