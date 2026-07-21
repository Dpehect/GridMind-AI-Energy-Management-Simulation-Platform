import { Boxes, CalendarDays, ClipboardList, LayoutDashboard, PackageSearch, TimerReset } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { DashboardBuilder } from "@/features/operations/dashboard-builder";
import { InventoryTable } from "@/features/operations/inventory-table";
import { WorkOrderBoardV2 } from "@/features/operations/work-order-board-v2";
import { OperationsCalendar } from "@/features/operations/calendar";
import { GanttTimeline } from "@/features/operations/gantt";
import { ScheduledReports } from "@/features/operations/scheduled-reports";
import { inventoryItems, workOrdersV2 } from "@/features/operations/data";
import { getLowStock, inventoryValue } from "@/features/operations/inventory-service";

export default function OperationsPage() {
  return <main className="space-y-6 p-5 md:p-8">
    <PageHeader eyebrow="Phase 21" title="Enterprise Operations Suite" description="Build dashboards, manage work orders, schedule maintenance, track inventory and automate recurring reports locally."/>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      <MetricCard label="Dashboard widgets" value="6" trend="Customizable" icon={LayoutDashboard}/>
      <MetricCard label="Open work orders" value={String(workOrdersV2.filter(i=>i.status!=="completed").length)} trend="Checklist-driven" icon={ClipboardList}/>
      <MetricCard label="Inventory items" value={String(inventoryItems.length)} trend={`₺${inventoryValue().toLocaleString()} value`} icon={Boxes}/>
      <MetricCard label="Low stock" value={String(getLowStock().length)} trend="Requires reorder" icon={PackageSearch}/>
      <MetricCard label="Calendar events" value={String(workOrdersV2.length)} trend="This month" icon={CalendarDays}/>
      <MetricCard label="Scheduled reports" value="3" trend="Local automation" icon={TimerReset}/>
    </div>
    <DashboardBuilder/>
    <WorkOrderBoardV2 items={workOrdersV2}/>
    <div className="grid gap-6 xl:grid-cols-2"><OperationsCalendar items={workOrdersV2}/><GanttTimeline items={workOrdersV2}/></div>
    <InventoryTable items={inventoryItems}/>
    <ScheduledReports/>
  </main>;
}
