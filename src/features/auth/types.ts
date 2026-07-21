export type AppRole =
  | "admin"
  | "energy_manager"
  | "facility_manager"
  | "analyst"
  | "viewer";

export type AppPermission =
  | "workspace.manage"
  | "users.manage"
  | "energy.read"
  | "energy.write"
  | "maintenance.read"
  | "maintenance.write"
  | "reports.read"
  | "reports.generate"
  | "operations.read"
  | "operations.write"
  | "settings.manage"
  | "audit.read";

export type AuthenticatedUser = {
  id: string;
  workspaceId: string;
  name: string;
  email: string;
  role: AppRole;
  active: boolean;
};
