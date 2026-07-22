import { PageHeader } from "@/components/ui/page-header";
import { ScenarioLab } from "@/features/scenarios/scenario-lab";

export default function ScenariosPage() {
  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 10 · Simulation Engine"
        title="Scenario planning lab"
        description="Model energy, cost and carbon interventions with deterministic local intelligence. No API key or external service is required."
      />
      <ScenarioLab />
    </main>
  );
}
