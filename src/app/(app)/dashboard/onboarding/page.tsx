import { PageHeader } from "@/components/ui/page-header";
import { getOnboardingSteps } from "@/features/ux/onboarding-service";
import { OnboardingPanel } from "@/features/ux/onboarding-panel";
import { ContextualHelp } from "@/features/ux/contextual-help";

export default async function OnboardingPage() {
  const steps = await getOnboardingSteps();

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 38"
        title="Workspace Onboarding"
        description="Configure GridMind for your organization with guided operational steps."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <OnboardingPanel steps={steps} />
        <ContextualHelp category="Getting started" />
      </div>
    </main>
  );
}
