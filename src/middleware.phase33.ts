import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(
  request: NextRequest
) {
  const requestId =
    request.headers.get("x-request-id") ??
    randomUUID();
  const correlationId =
    request.headers.get(
      "x-correlation-id"
    ) ?? requestId;

  const headers = new Headers(
    request.headers
  );
  headers.set("x-request-id", requestId);
  headers.set(
    "x-correlation-id",
    correlationId
  );

  const response = NextResponse.next({
    request: { headers }
  });

  response.headers.set(
    "x-request-id",
    requestId
  );
  response.headers.set(
    "x-correlation-id",
    correlationId
  );

  return response;
}
