import { CircleDollarSign, Leaf, Target, TrendingUp, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { GoalsOverview } from "@/features/goals/goals-overview";
import { RecommendationCenter } from "@/features/goals/recommendation-center";
import { ImpactEffortMatrix } from "@/features/goals/impact-effort-matrix";
import { ActionPlanBoard } from "@/features/goals/action-plan-board";
import { actionItems, goals, recommendations } from "@/features/goals/data";
import { actionPlanSummary } from "@/features/goals/engine";

export default function GoalsPage() {
  const summary = actionPlanSummary(actionItems);
  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 15"
        title="Goals, Recommendations & Action Plans"
        description="Turn GridMind intelligence into measurable targets, prioritized recommendations and accountable execution."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard label="Active goals" value={String(goals.length)} trend="Energy, cost and carbon" icon={Target} />
        <MetricCard label="Recommendations" value={String(recommendations.length)} trend="Ranked locally" icon={TrendingUp} />
        <MetricCard label="Expected savings" value={`${summary.expected.toLocaleString()} kWh`} trend="Open action plans" icon={Zap} />
        <MetricCard label="Realized savings" value={`${summary.realized.toLocaleString()} kWh`} trend={`${summary.realizationRate}% realized`} icon={Leaf} />
        <MetricCard label="Potential cost impact" value={`₺${recommendations.reduce((s, r) => s + r.estimatedSavingsCost, 0).toLocaleString()}`} trend="Annual estimate" icon={CircleDollarSign} />
      </div>
      <GoalsOverview goals={goals} />
      <RecommendationCenter items={recommendations} />
      <ImpactEffortMatrix recommendations={recommendations} />
      <ActionPlanBoard items={actionItems} />
    </main>
  );
}
