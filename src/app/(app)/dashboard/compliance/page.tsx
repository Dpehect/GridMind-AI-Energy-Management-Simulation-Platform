import { FileCheck2, ShieldCheck, TestTube2, UniversalAccess } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getComplianceReport } from "@/features/compliance/service";
import { ComplianceCheckGrid } from "@/features/compliance/check-grid";

export default async function CompliancePage() {
  const report = await getComplianceReport();

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 35"
        title="Testing & Compliance"
        description="Security, accessibility, integration and end-to-end validation status."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard
          label="Compliance status"
          value={report.status}
          trend={`Version ${report.version}`}
          icon={FileCheck2}
        />
        <MetricCard
          label="Security"
          value="OWASP"
          trend="Application controls"
          icon={ShieldCheck}
        />
        <MetricCard
          label="Accessibility"
          value="WCAG 2.2 AA"
          trend="Target standard"
          icon={UniversalAccess}
        />
        <MetricCard
          label="Automated checks"
          value={String(report.checks.length)}
          trend="Generated report"
          icon={TestTube2}
        />
      </div>

      <ComplianceCheckGrid checks={report.checks} />
    </main>
  );
}
