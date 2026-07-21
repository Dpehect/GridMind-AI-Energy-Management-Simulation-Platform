import type { Permission, UserRole } from "./types";

export const permissionMatrix: Record<UserRole, Permission[]> = {
  admin: [
    "workspace.manage","users.manage","energy.read","energy.write",
    "maintenance.read","maintenance.write","reports.read","reports.generate",
    "settings.manage","audit.read"
  ],
  energy_manager: [
    "energy.read","energy.write","maintenance.read",
    "reports.read","reports.generate","audit.read"
  ],
  facility_manager: [
    "energy.read","maintenance.read","maintenance.write","reports.read"
  ],
  analyst: ["energy.read","maintenance.read","reports.read","reports.generate"],
  viewer: ["energy.read","reports.read"]
};

export function hasPermission(role: UserRole, permission: Permission) {
  return permissionMatrix[role].includes(permission);
}
