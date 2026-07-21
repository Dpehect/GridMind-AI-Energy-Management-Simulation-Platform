import { PageHeader } from "@/components/ui/page-header";
import { CostCarbonDashboard } from "@/features/cost-carbon/cost-carbon-dashboard";

export default function CostCarbonPage() {
  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 13"
        title="Tariff, Cost & Carbon Intelligence"
        description="Compare tariff structures, shift peak demand and quantify cost and carbon outcomes without external APIs."
      />
      <CostCarbonDashboard />
    </main>
  );
}
