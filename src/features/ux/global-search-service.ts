import { prisma } from "@/lib/prisma";
import { getTenantContext } from "@/features/tenancy/context";
import type { GlobalSearchResult } from "./types";

export async function searchEntities(
  query: string
): Promise<GlobalSearchResult[]> {
  const context = await getTenantContext();
  const normalized = query.trim();

  if (normalized.length < 2) return [];

  const [buildings, devices, workOrders, reports, goals, inventory] =
    await Promise.all([
      prisma.building.findMany({
        where: {
          workspaceId: context.workspaceId,
          deletedAt: null,
          name: { contains: normalized }
        },
        take: 8
      }),
      prisma.device.findMany({
        where: {
          building: { workspaceId: context.workspaceId },
          name: { contains: normalized }
        },
        include: { building: true },
        take: 8
      }),
      prisma.workOrder.findMany({
        where: {
          building: { workspaceId: context.workspaceId },
          title: { contains: normalized }
        },
        take: 8
      }),
      prisma.report.findMany({
        where: {
          workspaceId: context.workspaceId,
          title: { contains: normalized }
        },
        take: 8
      }),
      prisma.energyGoal.findMany({
        where: {
          workspaceId: context.workspaceId,
          name: { contains: normalized }
        },
        take: 8
      }),
      prisma.inventoryItem.findMany({
        where: {
          workspaceId: context.workspaceId,
          OR: [
            { name: { contains: normalized } },
            { sku: { contains: normalized } }
          ]
        },
        take: 8
      })
    ]);

  return [
    ...buildings.map((item) => ({
      id: item.id,
      type: "building" as const,
      title: item.name,
      subtitle: item.code,
      href: `/dashboard/buildings/${item.id}`
    })),
    ...devices.map((item) => ({
      id: item.id,
      type: "device" as const,
      title: item.name,
      subtitle: item.building.name,
      href: `/dashboard/assets/${item.id}`
    })),
    ...workOrders.map((item) => ({
      id: item.id,
      type: "work_order" as const,
      title: item.title,
      subtitle: item.status,
      href: `/dashboard/maintenance/${item.id}`
    })),
    ...reports.map((item) => ({
      id: item.id,
      type: "report" as const,
      title: item.title,
      subtitle: item.status,
      href: `/dashboard/reports/${item.id}`
    })),
    ...goals.map((item) => ({
      id: item.id,
      type: "goal" as const,
      title: item.name,
      subtitle: item.status,
      href: `/dashboard/goals/${item.id}`
    })),
    ...inventory.map((item) => ({
      id: item.id,
      type: "inventory" as const,
      title: item.name,
      subtitle: item.sku,
      href: `/dashboard/operations?inventory=${item.id}`
    }))
  ].slice(0, 30);
}
