import { CheckCircle2, CircleGauge, CloudOff, ShieldCheck, TestTube2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { SectionCard } from "@/components/ui/section-card";
import { performanceBudgets } from "@/lib/performance";
import { releaseConfig } from "@/lib/release-config";

const checks = [
  ["Local-first operation","Pass"],
  ["External API keys","Not required"],
  ["Offline shell","Enabled"],
  ["Role and permission model","Implemented"],
  ["Analytics and simulation","Implemented"],
  ["Reporting and exports","Implemented"],
  ["Operations suite","Implemented"],
  ["PWA manifest","Implemented"]
];

export default function ReleasePage(){
  return <main className="space-y-6 p-5 md:p-8">
    <PageHeader eyebrow="Phase 22" title="Production Release Center" description="Final release controls, performance budgets, security posture and portfolio readiness."/>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <MetricCard label="Release" value={releaseConfig.version} trend="Release candidate" icon={CheckCircle2}/>
      <MetricCard label="Offline" value="Ready" trend="Service worker shell" icon={CloudOff}/>
      <MetricCard label="Security" value="Hardened" trend="CSP and headers" icon={ShieldCheck}/>
      <MetricCard label="Performance" value={`${performanceBudgets.largestContentfulPaintMs} ms`} trend="LCP budget" icon={CircleGauge}/>
      <MetricCard label="Quality" value="Ready" trend="Tests and CI included" icon={TestTube2}/>
    </div>
    <SectionCard title="Release checklist" description="Core production-readiness gates.">
      <div className="grid gap-3 md:grid-cols-2">{checks.map(([label,status])=><div key={label} className="flex items-center justify-between rounded-2xl border border-border p-4"><span className="text-sm font-medium">{label}</span><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">{status}</span></div>)}</div>
    </SectionCard>
    <SectionCard title="Performance budgets" description="Targets for release verification.">
      <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-5 text-xs leading-6 text-slate-200">{JSON.stringify(performanceBudgets,null,2)}</pre>
    </SectionCard>
  </main>
}
