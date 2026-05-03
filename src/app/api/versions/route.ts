import { NextResponse } from "next/server";
import {
  getLatestServerVersion,
  getServerVersionsDesc,
} from "@/libs/data-paths";

export const GET = async () => {
  const versions = await getServerVersionsDesc();
  return NextResponse.json({
    latest: "latest",
    latestMinecraftVersion: await getLatestServerVersion(),
    versions: ["latest", ...versions],
  });
};
