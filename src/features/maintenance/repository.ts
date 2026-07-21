import { deviceHealthSnapshots, maintenanceWorkOrders } from "./data";
import type { WorkOrder } from "./types";
import type { WorkOrderInput } from "./schemas";

export async function listDeviceHealth() {
  return structuredClone(deviceHealthSnapshots);
}

export async function listWorkOrders() {
  return structuredClone(maintenanceWorkOrders);
}

export async function createWorkOrder(input: WorkOrderInput): Promise<WorkOrder> {
  const device = deviceHealthSnapshots.find((item) => item.deviceId === input.deviceId);
  if (!device) throw new Error("Selected device was not found");

  return {
    id: `wo-${Date.now()}`,
    title: input.title,
    deviceId: input.deviceId,
    deviceName: device.deviceName,
    assetTag: device.assetTag,
    buildingName: device.buildingName,
    technician: input.technician,
    scheduledAt: input.scheduledAt,
    status: "scheduled",
    priority: input.priority,
    estimatedCost: input.estimatedCost,
    description: input.description
  };
}
