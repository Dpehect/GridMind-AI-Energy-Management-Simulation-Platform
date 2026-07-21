import type { Recommendation } from "./types";
import { recommendationPriority } from "./engine";
import { SectionCard } from "@/components/ui/section-card";

export function ImpactEffortMatrix({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <SectionCard title="Impact–effort matrix" description="Prioritize high-impact opportunities with lower implementation effort.">
      <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-muted/30">
        <div className="absolute inset-x-1/2 top-0 bottom-0 border-l border-dashed border-border" />
        <div className="absolute inset-y-1/2 left-0 right-0 border-t border-dashed border-border" />
        <span className="absolute left-3 top-3 text-xs text-muted-foreground">High impact / low effort</span>
        <span className="absolute right-3 top-3 text-xs text-muted-foreground">High impact / high effort</span>
        <span className="absolute bottom-3 left-3 text-xs text-muted-foreground">Low impact / low effort</span>
        <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">Low impact / high effort</span>

        {recommendations.map((item) => (
          <div
            key={item.id}
            className="absolute w-44 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-3 shadow-lg"
            style={{
              left: `${Math.max(8, Math.min(92, item.effortScore))}%`,
              top: `${Math.max(10, Math.min(90, 100 - item.impactScore))}%`
            }}
          >
            <p className="text-xs font-semibold">{item.title}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Priority {recommendationPriority(item)} · {Math.round(item.confidence * 100)}% confidence</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
