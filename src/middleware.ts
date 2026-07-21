import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/forbidden",
  "/runtime-error",
  "/portfolio",
  "/api/health",
  "/api/health/live",
  "/api/health/ready"
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("x-gridmind-mode", "local-first");
  response.headers.set("x-request-path", request.nextUrl.pathname);

  if (
    publicRoutes.some(
      (route) =>
        request.nextUrl.pathname === route ||
        request.nextUrl.pathname.startsWith(`${route}/`)
    )
  ) {
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/).*)"]
};
