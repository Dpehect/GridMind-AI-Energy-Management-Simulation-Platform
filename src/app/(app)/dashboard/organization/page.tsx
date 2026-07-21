import { Building2, Layers3, Users2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { MetricCard } from "@/components/ui/metric-card";
import { getTenantContext } from "@/features/tenancy/context";
import { getOrganizationPortfolioAnalytics } from "@/features/tenancy/portfolio-analytics";
import { PortfolioTable } from "@/features/tenancy/portfolio-table";

export default async function OrganizationPage() {
  const context = await getTenantContext();
  const portfolio =
    await getOrganizationPortfolioAnalytics();

  return (
    <main className="space-y-6 p-5 md:p-8">
      <PageHeader
        eyebrow="Phase 31"
        title="Organization Portfolio"
        description="Tenant-aware workspace and building performance across the organization."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Workspaces"
          value={String(portfolio.length)}
          trend="Organization scope"
          icon={Layers3}
        />
        <MetricCard
          label="Buildings"
          value={String(
            portfolio.reduce(
              (sum, item) => sum + item.buildingCount,
              0
            )
          )}
          trend="Active portfolio"
          icon={Building2}
        />
        <MetricCard
          label="Membership role"
          value={context.organizationRole.replaceAll("_", " ")}
          trend="Tenant access"
          icon={Users2}
        />
      </div>

      <PortfolioTable items={portfolio} />
    </main>
  );
}
