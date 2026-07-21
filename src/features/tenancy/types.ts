export type OrganizationRole =
  | "super_admin"
  | "organization_admin"
  | "member"
  | "auditor";

export type WorkspaceRole =
  | "workspace_admin"
  | "energy_manager"
  | "facility_manager"
  | "analyst"
  | "technician"
  | "viewer";

export type BuildingAccessLevel =
  | "read"
  | "operate"
  | "manage";

export type TenantContext = {
  organizationId: string;
  workspaceId: string;
  userId: string;
  organizationRole: OrganizationRole;
  workspaceRole: WorkspaceRole;
};
