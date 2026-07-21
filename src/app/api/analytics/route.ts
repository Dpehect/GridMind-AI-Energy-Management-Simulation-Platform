import { NextResponse } from "next/server";
import { getAnalyticsSuite } from "@/features/analytics/analytics-service";
export async function GET(){return NextResponse.json(getAnalyticsSuite())}
