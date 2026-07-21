import type { ReportDataset } from "./types";

export function ReportChart({ dataset }: { dataset: ReportDataset }) {
  const max = Math.max(...dataset.monthlySeries.map((item) => item.energy));
  return (
    <div className="space-y-3">
      <div className="flex h-56 items-end gap-3 rounded-2xl border border-border bg-muted/25 p-4">
        {dataset.monthlySeries.map((item) => (
          <div key={item.month} className="flex h-full flex-1 flex-col justify-end gap-2">
            <div
              className="min-h-2 rounded-t-xl bg-gradient-to-t from-primary to-cyan-400"
              style={{ height: `${Math.max(8, item.energy / max * 100)}%` }}
              title={`${item.energy.toLocaleString()} kWh`}
            />
            <span className="text-center text-xs text-muted-foreground">{item.month}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">Six-month energy consumption trend. Values are deterministic local demo data.</p>
    </div>
  );
}
