import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { getOperationsWorkflowSummary } from "@/features/operations/workflows/operations-dashboard-service";
import { WorkflowSummary } from "@/features/operations/workflows/workflow-summary";
import { listDueMaintenancePlans } from "@/features/maintenance/recurring-plan-service";

export default async function WorkflowsPage() {
  const [summary, plans] = await Promise.all([
    getOperationsWorkflowSummary(),
    listDueMaintenancePlans()
  ]);

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 32"
        title="Enterprise Operations Workflows"
        description="Persistent maintenance, inventory, procurement, goal and report approval workflows."
      />

      <WorkflowSummary data={summary} />

      <SectionCard
        title="Upcoming recurring maintenance"
        description="Plans due within the next seven days."
      >
        <div className="space-y-3">
          {plans.length ? (
            plans.map((plan) => (
              <article
                key={plan.id}
                className="rounded-2xl border border-border p-4"
              >
                <p className="font-medium">{plan.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {plan.building.name}
                  {plan.device ? ` · ${plan.device.name}` : ""}
                  {" · "}
                  {plan.nextRunAt.toLocaleString("tr-TR")}
                </p>
              </article>
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No maintenance plans are due.
            </p>
          )}
        </div>
      </SectionCard>
    </main>
  );
}
