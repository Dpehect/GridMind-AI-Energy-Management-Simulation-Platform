import type { AppRole } from "@/features/auth/types";

export type RoleDashboardConfig = {
  title: string;
  description: string;
  primaryRoutes: string[];
};

export const roleDashboards: Record<AppRole, RoleDashboardConfig> = {
  admin: {
    title: "Enterprise Control Center",
    description: "Organization, security, operations and system health.",
    primaryRoutes: [
      "/dashboard/organization",
      "/dashboard/observability",
      "/dashboard/compliance",
      "/dashboard/jobs"
    ]
  },
  energy_manager: {
    title: "Energy Performance Center",
    description: "Consumption, forecasting, scenarios and goals.",
    primaryRoutes: [
      "/dashboard/analytics",
      "/dashboard/intelligence",
      "/dashboard/scenarios",
      "/dashboard/goals"
    ]
  },
  facility_manager: {
    title: "Facility Operations Center",
    description: "Maintenance, devices, inventory and workflows.",
    primaryRoutes: [
      "/dashboard/maintenance",
      "/dashboard/assets",
      "/dashboard/operations",
      "/dashboard/workflows"
    ]
  },
  analyst: {
    title: "Analytics Workspace",
    description: "Reporting, benchmarks and trend analysis.",
    primaryRoutes: [
      "/dashboard/analytics",
      "/dashboard/reports",
      "/dashboard/cost-carbon"
    ]
  },
  viewer: {
    title: "Executive Overview",
    description: "Read-only performance and reporting access.",
    primaryRoutes: [
      "/dashboard",
      "/dashboard/reports",
      "/dashboard/goals"
    ]
  }
};
