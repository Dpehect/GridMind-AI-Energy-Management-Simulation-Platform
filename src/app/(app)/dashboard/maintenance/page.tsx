import { Activity, AlertTriangle, CalendarClock, CircleDollarSign, Gauge, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { DeviceHealthTable } from "@/features/maintenance/device-health-table";
import { WorkOrderBoard } from "@/features/maintenance/work-order-board";
import { WorkOrderForm } from "@/features/maintenance/work-order-form";
import { getMaintenanceDashboard } from "@/features/maintenance/service";

export default async function MaintenancePage() {
  const dashboard = await getMaintenanceDashboard();
  const { summary } = dashboard;

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader eyebrow="Phase 14R" title="Maintenance & Device Health" description="Prioritize preventive maintenance using explainable local health scoring, energy-loss estimates and operational work orders." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard label="Fleet health" value={`${summary.fleetHealth}/100`} trend="Weighted device average" icon={Gauge} />
        <MetricCard label="Open work orders" value={String(summary.openWorkOrders)} trend={`${summary.overdueWorkOrders} overdue`} icon={CalendarClock} />
        <MetricCard label="Predicted failures" value={String(summary.predictedFailures)} trend="Next 30 days" icon={AlertTriangle} />
        <MetricCard label="Energy at risk" value={`${summary.estimatedWasteKwh.toLocaleString()} kWh`} trend="Annual estimated waste" icon={Zap} />
        <MetricCard label="Planned cost" value={`₺${summary.plannedCost.toLocaleString()}`} trend="Open work orders" icon={CircleDollarSign} />
        <MetricCard label="Active signals" value={String(dashboard.devices.reduce((sum, item) => sum + item.anomalyCount30d, 0))} trend="Last 30 days" icon={Activity} />
      </div>
      <DeviceHealthTable devices={dashboard.devices} />
      <WorkOrderBoard workOrders={dashboard.workOrders} />
      <SectionCard title="Create work order" description="Schedule a validated maintenance intervention and assign responsibility.">
        <WorkOrderForm devices={dashboard.devices} />
      </SectionCard>
    </main>
  );
}
