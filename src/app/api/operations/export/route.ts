import { NextResponse } from "next/server";
import { inventoryItems, workOrdersV2 } from "@/features/operations/data";
export async function GET(){return NextResponse.json({inventory:inventoryItems,workOrders:workOrdersV2,generatedAt:new Date().toISOString()})}
