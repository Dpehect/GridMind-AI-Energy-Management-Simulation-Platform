import type { AppPermission, AppRole } from "./types";

export const rolePermissions: Record<AppRole, AppPermission[]> = {
  admin: [
    "workspace.manage",
    "users.manage",
    "energy.read",
    "energy.write",
    "maintenance.read",
    "maintenance.write",
    "reports.read",
    "reports.generate",
    "operations.read",
    "operations.write",
    "settings.manage",
    "audit.read"
  ],
  energy_manager: [
    "energy.read",
    "energy.write",
    "maintenance.read",
    "reports.read",
    "reports.generate",
    "operations.read",
    "audit.read"
  ],
  facility_manager: [
    "energy.read",
    "maintenance.read",
    "maintenance.write",
    "reports.read",
    "operations.read",
    "operations.write"
  ],
  analyst: [
    "energy.read",
    "maintenance.read",
    "reports.read",
    "reports.generate",
    "operations.read"
  ],
  viewer: ["energy.read", "reports.read", "operations.read"]
};

export function hasPermission(role: AppRole, permission: AppPermission) {
  return rolePermissions[role].includes(permission);
}
