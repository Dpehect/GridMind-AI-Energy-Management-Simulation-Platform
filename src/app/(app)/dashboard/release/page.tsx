import {
  CheckCircle2,
  CircleGauge,
  CloudOff,
  ShieldCheck,
  TestTube2
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { performanceBudgets } from "@/lib/performance";
import { getReleaseHealth } from "@/features/release/release-health-service";
import { ReleaseHealthPanel } from "@/features/release/release-health-panel";

export default async function ReleasePage() {
  const health = await getReleaseHealth();

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 26"
        title="Production Release Center"
        description="Verified release health, performance budgets, security posture and deployment readiness."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Release"
          value={health.version}
          trend={health.status}
          icon={CheckCircle2}
        />
        <MetricCard
          label="Offline"
          value="Scoped"
          trend="API routes excluded"
          icon={CloudOff}
        />
        <MetricCard
          label="Security"
          value="Enforced"
          trend="Auth and permissions"
          icon={ShieldCheck}
        />
        <MetricCard
          label="Performance"
          value={`${performanceBudgets.largestContentfulPaintMs} ms`}
          trend="LCP budget"
          icon={CircleGauge}
        />
        <MetricCard
          label="Quality"
          value={String(health.checks.filter((check) => check.status === "pass").length)}
          trend="Verified checks"
          icon={TestTube2}
        />
      </div>

      <ReleaseHealthPanel checks={health.checks} />

      <SectionCard
        title="Performance budgets"
        description="Targets used during production verification."
      >
        <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-5 text-xs leading-6 text-slate-200">
          {JSON.stringify(performanceBudgets, null, 2)}
        </pre>
      </SectionCard>
    </main>
  );
}
