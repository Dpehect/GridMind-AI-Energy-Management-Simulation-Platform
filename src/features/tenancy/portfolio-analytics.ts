import { prisma } from "@/lib/prisma";
import { getTenantContext } from "./context";

export async function getOrganizationPortfolioAnalytics() {
  const context = await getTenantContext();

  const workspaces = await prisma.workspace.findMany({
    where: {
      organizationId: context.organizationId
    },
    include: {
      buildings: {
        where: {
          deletedAt: null,
          isActive: true
        },
        include: {
          devices: true,
          meters: {
            include: {
              readings: {
                orderBy: {
                  capturedAt: "desc"
                },
                take: 30
              }
            }
          }
        }
      }
    }
  });

  return workspaces.map((workspace) => {
    const buildings = workspace.buildings;
    const totalAreaM2 = buildings.reduce(
      (sum, building) => sum + building.floorAreaM2,
      0
    );
    const totalDevices = buildings.reduce(
      (sum, building) => sum + building.devices.length,
      0
    );
    const readingTotal = buildings.reduce(
      (sum, building) =>
        sum +
        building.meters.reduce(
          (meterSum, meter) =>
            meterSum +
            meter.readings.reduce(
              (readingSum, reading) =>
                readingSum + reading.value,
              0
            ),
          0
        ),
      0
    );

    return {
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      buildingCount: buildings.length,
      totalAreaM2,
      totalDevices,
      recentEnergyKwh: readingTotal,
      energyIntensity:
        totalAreaM2 > 0
          ? readingTotal / totalAreaM2
          : 0
    };
  });
}
