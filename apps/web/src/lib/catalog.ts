import { resolve } from "node:path";
import { createDataPaths } from "@spigot-event-list/catalog/data-paths";
export const dataRoot = resolve("../../data");
export const catalog = createDataPaths(dataRoot);
