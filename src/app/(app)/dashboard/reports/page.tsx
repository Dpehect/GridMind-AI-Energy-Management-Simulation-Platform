import { FileCheck2, FileClock, FileText, Layers3 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { reportTemplates, savedReports } from "@/features/reports/data";
import { ReportHistory } from "@/features/reports/report-history";
import { ReportStudio } from "@/features/reports/report-studio";

export default function ReportsPage() {
  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader eyebrow="Phase 16" title="Professional Reporting Studio" description="Compose executive-ready energy reports, rearrange sections and export portable local formats without external services." />
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Templates" value={String(reportTemplates.length)} trend="Executive and operational" icon={Layers3}/>
        <MetricCard label="Saved reports" value={String(savedReports.length)} trend="Versioned locally" icon={FileText}/>
        <MetricCard label="Ready" value={String(savedReports.filter((item)=>item.status==="ready").length)} trend="Approved for distribution" icon={FileCheck2}/>
        <MetricCard label="Drafts" value={String(savedReports.filter((item)=>item.status==="draft").length)} trend="Awaiting review" icon={FileClock}/>
      </div>
      <ReportStudio/>
      <ReportHistory/>
    </main>
  );
}
