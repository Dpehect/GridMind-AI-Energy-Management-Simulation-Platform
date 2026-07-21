import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-gridmind-mode", "local-first");
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"]
};
