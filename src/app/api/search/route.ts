import { NextResponse } from "next/server";
import { searchEntities } from "@/features/ux/global-search-service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const results = await searchEntities(query);

  return NextResponse.json(results, {
    headers: { "Cache-Control": "no-store" }
  });
}
