import { NextResponse } from "next/server";
import {
  getDefaultDashboardLayout,
  listInventoryItems,
  listScheduledReports
} from "@/features/operations/repository";
import { listWorkOrders } from "@/features/maintenance/repository";

export async function GET() {
  const [inventory, workOrders, scheduledReports, dashboardLayout] =
    await Promise.all([
      listInventoryItems(),
      listWorkOrders(),
      listScheduledReports(),
      getDefaultDashboardLayout()
    ]);

  return NextResponse.json({
    inventory,
    workOrders,
    scheduledReports,
    dashboardLayout,
    generatedAt: new Date().toISOString()
  });
}
