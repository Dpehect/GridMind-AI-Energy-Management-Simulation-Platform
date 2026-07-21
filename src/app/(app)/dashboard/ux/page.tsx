import { Compass, Search, Smartphone, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getOnboardingSteps } from "@/features/ux/onboarding-service";
import { OnboardingPanel } from "@/features/ux/onboarding-panel";
import { ContextualHelp } from "@/features/ux/contextual-help";

export default async function EnterpriseUxPage() {
  const steps = await getOnboardingSteps();

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 38"
        title="Enterprise UX"
        description="Guided onboarding, contextual help, global search and role-aware experiences."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Onboarding" value="Guided" trend="Workspace setup" icon={Compass}/>
        <MetricCard label="Global search" value="Entity-aware" trend="6 data domains" icon={Search}/>
        <MetricCard label="Field UX" value="Mobile-first" trend="Technician workflow" icon={Smartphone}/>
        <MetricCard label="Interaction" value="Contextual" trend="Help and empty states" icon={Sparkles}/>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <OnboardingPanel steps={steps}/>
        <ContextualHelp/>
      </div>
    </main>
  );
}
