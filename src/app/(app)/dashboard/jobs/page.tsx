import { CheckCircle2, Clock3, Loader2, XCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getJobDashboard } from "@/features/jobs/dashboard-service";
import { JobTable } from "@/features/jobs/job-table";

export default async function JobsPage() {
  const data = await getJobDashboard();

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 34"
        title="Background Jobs & Automation"
        description="Durable local queue, retries, scheduled reports and recurring maintenance."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Queued" value={String(data.queued)} trend="Awaiting worker" icon={Clock3}/>
        <MetricCard label="Running" value={String(data.running)} trend="Currently processing" icon={Loader2}/>
        <MetricCard label="Completed" value={String(data.completed)} trend="Successful jobs" icon={CheckCircle2}/>
        <MetricCard label="Failed" value={String(data.failed)} trend="Needs attention" icon={XCircle}/>
      </div>

      <JobTable items={data.recent}/>
    </main>
  );
}
