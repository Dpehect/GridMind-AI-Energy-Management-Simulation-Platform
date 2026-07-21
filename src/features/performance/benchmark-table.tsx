import { SectionCard } from "@/components/ui/section-card";

export function BenchmarkTable({
  items
}: {
  items: Array<{
    label: string;
    durationMs: number;
    rows: number;
  }>;
}) {
  return (
    <SectionCard
      title="Performance benchmark"
      description="Repository-level latency and result-size checks."
    >
      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-border p-4"
          >
            <div>
              <p className="text-sm font-medium">
                {item.label}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {item.rows} row(s)
              </p>
            </div>
            <span
              className={
                item.durationMs <= 250
                  ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
                  : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
              }
            >
              {item.durationMs} ms
            </span>
          </article>
        ))}
      </div>
    </SectionCard>
  );
}
