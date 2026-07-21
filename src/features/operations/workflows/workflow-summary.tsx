import {
  AlertTriangle,
  ClipboardList,
  FileCheck2,
  PackageSearch,
  ShoppingCart,
  Target
} from "lucide-react";
import { MetricCard } from "@/components/ui/metric-card";

export function WorkflowSummary({
  data
}: {
  data: {
    openWorkOrders: number;
    overdueWorkOrders: number;
    lowStockItems: number;
    pendingPurchaseRequests: number;
    reportsInReview: number;
    atRiskGoals: number;
  };
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      <MetricCard
        label="Open work orders"
        value={String(data.openWorkOrders)}
        trend="Active operations"
        icon={ClipboardList}
      />
      <MetricCard
        label="Overdue"
        value={String(data.overdueWorkOrders)}
        trend="Requires escalation"
        icon={AlertTriangle}
      />
      <MetricCard
        label="Low stock"
        value={String(data.lowStockItems)}
        trend="Reorder attention"
        icon={PackageSearch}
      />
      <MetricCard
        label="Purchase requests"
        value={String(data.pendingPurchaseRequests)}
        trend="Pending decision"
        icon={ShoppingCart}
      />
      <MetricCard
        label="Reports in review"
        value={String(data.reportsInReview)}
        trend="Approval workflow"
        icon={FileCheck2}
      />
      <MetricCard
        label="Goals at risk"
        value={String(data.atRiskGoals)}
        trend="Intervention required"
        icon={Target}
      />
    </div>
  );
}
