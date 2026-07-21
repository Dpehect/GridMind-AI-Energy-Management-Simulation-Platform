import { Archive, Clock3, FileCheck2 } from "lucide-react";
import { savedReports } from "./data";
import { SectionCard } from "@/components/ui/section-card";
import { StatusBadge } from "@/components/ui/status-badge";

export function ReportHistory() {
  return (
    <SectionCard title="Report history" description="Saved local reports with status and version tracking.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-muted-foreground"><tr className="border-b"><th className="pb-3">Report</th><th className="pb-3">Type</th><th className="pb-3">Period</th><th className="pb-3">Building</th><th className="pb-3">Version</th><th className="pb-3">Status</th></tr></thead>
          <tbody>{savedReports.map((report)=><tr key={report.id} className="border-b border-border/60"><td className="py-4"><div className="flex items-center gap-3">{report.status==="ready"?<FileCheck2 className="size-4 text-emerald-500"/>:<Clock3 className="size-4 text-amber-500"/>}<span className="font-medium">{report.title}</span></div></td><td className="py-4 capitalize">{report.type}</td><td className="py-4">{new Date(report.periodStart).toLocaleDateString("tr-TR")}–{new Date(report.periodEnd).toLocaleDateString("tr-TR")}</td><td className="py-4">{report.building}</td><td className="py-4">v{report.version}</td><td className="py-4"><StatusBadge status={report.status==="ready"?"success":"info"}>{report.status}</StatusBadge></td></tr>)}</tbody>
        </table>
      </div>
    </SectionCard>
  );
}
