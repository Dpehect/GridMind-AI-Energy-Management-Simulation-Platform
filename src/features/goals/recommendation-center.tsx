import { CheckCircle2, Lightbulb, TrendingDown } from "lucide-react";
import type { Recommendation } from "./types";
import { recommendationPriority } from "./engine";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function RecommendationCenter({ items }: { items: Recommendation[] }) {
  return (
    <SectionCard title="Recommendation center" description="Explainable, deterministic recommendations ranked by impact, effort and confidence.">
      <div className="grid gap-4 lg:grid-cols-2">
        {[...items].sort((a, b) => recommendationPriority(b) - recommendationPriority(a)).map((item) => (
          <article key={item.id} className="rounded-2xl border border-border p-5">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs text-muted-foreground">{item.category}</p></div>
              <StatusBadge status={item.status === "accepted" ? "success" : "info"}>{item.status}</StatusBadge>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.summary}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-muted p-3"><Lightbulb className="mb-2 size-4 text-primary" /><p className="text-muted-foreground">Priority</p><p className="mt-1 font-semibold text-foreground">{recommendationPriority(item)}</p></div>
              <div className="rounded-xl bg-muted p-3"><TrendingDown className="mb-2 size-4 text-primary" /><p className="text-muted-foreground">Savings</p><p className="mt-1 font-semibold text-foreground">{item.estimatedSavingsKwh.toLocaleString()} kWh</p></div>
              <div className="rounded-xl bg-muted p-3"><CheckCircle2 className="mb-2 size-4 text-primary" /><p className="text-muted-foreground">Confidence</p><p className="mt-1 font-semibold text-foreground">{Math.round(item.confidence * 100)}%</p></div>
            </div>
            <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
              {item.evidence.map((evidence) => <li key={evidence}>• {evidence}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
