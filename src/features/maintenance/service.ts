import { buildMaintenanceSummary, estimateMaintenanceImpact, failureProbability } from "./health-engine";
import { listDeviceHealth, listWorkOrders } from "./repository";

export async function getMaintenanceDashboard() {
  const [devices, workOrders] = await Promise.all([listDeviceHealth(), listWorkOrders()]);
  return {
    devices: devices.map((device) => ({
      ...device,
      failureProbability: failureProbability(device),
      impact: estimateMaintenanceImpact(device)
    })),
    workOrders,
    summary: buildMaintenanceSummary(devices, workOrders)
  };
}
