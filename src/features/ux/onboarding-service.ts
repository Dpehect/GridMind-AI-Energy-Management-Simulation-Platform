import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";
import type { OnboardingStep } from "./types";

export async function getOnboardingSteps(): Promise<OnboardingStep[]> {
  const context = await getTenantContext();

  const [buildingCount, meterCount, userCount, goalCount] = await Promise.all([
    prisma.building.count({
      where: { workspaceId: context.workspaceId, deletedAt: null }
    }),
    prisma.meter.count({
      where: { building: { workspaceId: context.workspaceId } }
    }),
    prisma.workspaceMembership.count({
      where: { workspaceId: context.workspaceId, active: true }
    }),
    prisma.energyGoal.count({
      where: { workspaceId: context.workspaceId }
    })
  ]);

  return [
    {
      id: "workspace",
      title: "Configure workspace",
      description: "Set locale, currency, timezone and feature flags.",
      completed: true,
      href: "/dashboard/settings"
    },
    {
      id: "building",
      title: "Add first building",
      description: "Create a building and define its operational scope.",
      completed: buildingCount > 0,
      href: "/dashboard/buildings"
    },
    {
      id: "meter",
      title: "Connect energy data",
      description: "Add meters or import historical readings.",
      completed: meterCount > 0,
      href: "/dashboard/data-ingestion"
    },
    {
      id: "team",
      title: "Invite team members",
      description: "Assign workspace roles and building access.",
      completed: userCount > 1,
      href: "/dashboard/admin"
    },
    {
      id: "goal",
      title: "Create an energy goal",
      description: "Define measurable targets and ownership.",
      completed: goalCount > 0,
      href: "/dashboard/goals"
    }
  ];
}
