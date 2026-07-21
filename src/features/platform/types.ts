export type UserRole = "admin" | "energy_manager" | "facility_manager" | "analyst" | "viewer";
export type Permission =
  | "workspace.manage"
  | "users.manage"
  | "energy.read"
  | "energy.write"
  | "maintenance.read"
  | "maintenance.write"
  | "reports.read"
  | "reports.generate"
  | "settings.manage"
  | "audit.read";

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  lastSeenAt: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "critical" | "success";
  read: boolean;
  createdAt: string;
};

export type AuditEvent = {
  id: string;
  actor: string;
  action: string;
  entityType: string;
  entityId?: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
};
