import { i18nRouter } from "next-i18n-router";
import { NextRequest } from "next/server";
import { i18nConfig } from "@/i18n/config";

export function proxy(request: NextRequest) {
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
