import { Target } from "lucide-react";
import type { EnergyGoal } from "./types";
import { goalProgress } from "./engine";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function GoalsOverview({ goals }: { goals: EnergyGoal[] }) {
  return (
    <SectionCard title="Strategic goals" description="Monitor energy, cost and carbon outcomes against approved targets.">
      <div className="grid gap-4 lg:grid-cols-3">
        {goals.map((goal) => {
          const progress = goalProgress(goal);
          return (
            <article key={goal.id} className="rounded-2xl border border-border p-5">
              <div className="flex items-start justify-between gap-3">
                <Target className="size-5 text-primary" />
                <StatusBadge status={goal.status === "on_track" ? "success" : goal.status === "at_risk" ? "warning" : "info"}>{goal.status.replace("_", " ")}</StatusBadge>
              </div>
              <h3 className="mt-4 font-semibold">{goal.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{goal.owner}</p>
              <div className="mt-5 flex items-end justify-between gap-3">
                <div><p className="text-xs text-muted-foreground">Current</p><p className="text-xl font-semibold">{goal.current.toLocaleString()} {goal.unit}</p></div>
                <div className="text-right"><p className="text-xs text-muted-foreground">Target</p><p className="font-medium">{goal.target.toLocaleString()} {goal.unit}</p></div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} /></div>
              <p className="mt-2 text-xs text-muted-foreground">{progress}% of target achieved</p>
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}
