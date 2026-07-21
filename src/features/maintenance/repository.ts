import { prisma } from "@/lib/prisma";
import { writeAuditEvent } from "@/lib/audit";
import type { WorkOrderInput } from "./schemas";

export async function listDeviceHealth() {
  const devices = await prisma.device.findMany({
    include: { building: true },
    orderBy: [{ healthScore: "asc" }, { name: "asc" }]
  });

  return devices.map((device) => ({
    deviceId: device.id,
    assetTag: device.assetTag,
    deviceName: device.name,
    category: device.category,
    buildingName: device.building.name,
    healthScore: device.healthScore,
    risk:
      device.healthScore < 45
        ? "critical"
        : device.healthScore < 65
          ? "high"
          : device.healthScore < 80
            ? "medium"
            : "low",
    operatingHours: device.operatingHours,
    anomalyCount30d: device.anomalyCount30d,
    efficiencyLossPercent: device.efficiencyLossPercent,
    nextMaintenanceAt: new Date(Date.now() + 14 * 86400000).toISOString(),
    estimatedAnnualWasteKwh: Math.round(
      device.ratedPowerKw * device.operatingHours * (device.efficiencyLossPercent / 100)
    )
  }));
}

export async function listWorkOrders() {
  const orders = await prisma.workOrder.findMany({
    include: { building: true, device: true },
    orderBy: [{ startsAt: "asc" }, { createdAt: "desc" }]
  });

  return orders.map((order) => ({
    id: order.id,
    title: order.title,
    deviceId: order.deviceId ?? "",
    deviceName: order.device?.name ?? "Unassigned device",
    assetTag: order.device?.assetTag ?? "N/A",
    buildingName: order.building.name,
    technician: order.owner,
    scheduledAt: order.startsAt.toISOString(),
    status: order.status.toLowerCase(),
    priority: order.priority.toLowerCase(),
    estimatedCost: order.estimatedCost,
    actualCost: order.actualCost ?? undefined,
    description: order.description ?? "",
    outcome: order.outcome ?? undefined
  }));
}

export async function createWorkOrder(input: WorkOrderInput) {
  const device = await prisma.device.findUnique({
    where: { id: input.deviceId },
    include: { building: true }
  });
  if (!device) throw new Error("Selected device was not found");

  const created = await prisma.workOrder.create({
    data: {
      buildingId: device.buildingId,
      deviceId: device.id,
      title: input.title,
      description: input.description,
      owner: input.technician,
      startsAt: new Date(input.scheduledAt),
      endsAt: new Date(new Date(input.scheduledAt).getTime() + 2 * 3600000),
      priority: input.priority.toUpperCase() as never,
      status: "SCHEDULED",
      estimatedCost: input.estimatedCost
    }
  });

  await writeAuditEvent({
    action: "work_order.created",
    entityType: "WorkOrder",
    entityId: created.id,
    metadata: { deviceId: device.id, priority: input.priority }
  });

  return created;
}
