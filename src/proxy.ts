import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/login",
  "/forbidden",
  "/runtime-error",
  "/portfolio",
  "/api/health",
  "/api/health/live",
  "/api/health/ready",
  "/api/health/schema"
];

export function proxy(request: NextRequest) {
  const requestId =
    request.headers.get("x-request-id") ?? randomUUID();
  const correlationId =
    request.headers.get("x-correlation-id") ?? requestId;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);
  requestHeaders.set("x-correlation-id", correlationId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  response.headers.set("x-request-id", requestId);
  response.headers.set("x-correlation-id", correlationId);
  response.headers.set("x-gridmind-mode", "local-first");

  const pathname = request.nextUrl.pathname;
  const isPublic = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublic) return response;

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icons/).*)"]
};
