import type { WorkOrder } from "./types";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

const columns = [
  { status: "overdue", label: "Overdue" },
  { status: "scheduled", label: "Scheduled" },
  { status: "in_progress", label: "In progress" },
  { status: "completed", label: "Completed" }
] as const;

export function WorkOrderBoard({ workOrders }: { workOrders: WorkOrder[] }) {
  return (
    <SectionCard title="Maintenance work orders" description="Operational board for scheduled, active and completed maintenance.">
      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map((column) => {
          const orders = workOrders.filter((order) => order.status === column.status);
          return (
            <section key={column.status} className="rounded-2xl bg-muted/45 p-3">
              <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold">{column.label}</h3><span className="rounded-full bg-background px-2 py-0.5 text-xs">{orders.length}</span></div>
              <div className="space-y-3">
                {orders.length ? orders.map((order) => (
                  <article key={order.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3"><p className="font-medium">{order.title}</p><StatusBadge status={order.priority === "critical" ? "critical" : order.priority === "high" ? "warning" : "info"}>{order.priority}</StatusBadge></div>
                    <p className="mt-2 text-xs text-muted-foreground">{order.assetTag} · {order.deviceName}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{order.description}</p>
                    <div className="mt-4 border-t pt-3 text-xs text-muted-foreground"><p>{order.technician}</p><p className="mt-1">{new Date(order.scheduledAt).toLocaleString("tr-TR")}</p></div>
                  </article>
                )) : <p className="rounded-xl border border-dashed p-4 text-center text-xs text-muted-foreground">No work orders</p>}
              </div>
            </section>
          );
        })}
      </div>
    </SectionCard>
  );
}
