import type { ActionItem } from "./types";
import { SectionCard } from "@/components/ui/section-card";

const columns = [
  ["backlog", "Backlog"],
  ["planned", "Planned"],
  ["in_progress", "In progress"],
  ["done", "Done"]
] as const;

export function ActionPlanBoard({ items }: { items: ActionItem[] }) {
  return (
    <SectionCard title="Action plan" description="Track implementation status, ownership and realized savings.">
      <div className="grid gap-4 xl:grid-cols-4">
        {columns.map(([status, label]) => {
          const filtered = items.filter((item) => item.status === status);
          return (
            <section key={status} className="rounded-2xl bg-muted/40 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{label}</h3>
                <span className="rounded-full bg-background px-2 py-0.5 text-xs">{filtered.length}</span>
              </div>
              <div className="space-y-3">
                {filtered.length ? filtered.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-2 text-xs text-muted-foreground">{item.owner}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Due {new Date(item.dueDate).toLocaleDateString("tr-TR")}</p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${Math.min(100, item.expectedSavingsKwh ? item.realizedSavingsKwh / item.expectedSavingsKwh * 100 : 0)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">{item.realizedSavingsKwh.toLocaleString()} / {item.expectedSavingsKwh.toLocaleString()} kWh</p>
                  </article>
                )) : <p className="rounded-xl border border-dashed p-4 text-center text-xs text-muted-foreground">No items</p>}
              </div>
            </section>
          );
        })}
      </div>
    </SectionCard>
  );
}
