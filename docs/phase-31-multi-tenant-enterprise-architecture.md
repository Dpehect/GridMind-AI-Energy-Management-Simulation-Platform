# Phase 31 — Multi-Tenant Enterprise Architecture

Delivered:

- Organization model
- Organization memberships
- Workspace memberships
- Workspace switcher
- Active workspace cookie
- Tenant context resolution
- Tenant-aware query helpers
- Building-level access grants
- Workspace feature flags
- Workspace locale, currency and timezone
- Organization portfolio analytics
- Tenant context API
- Tenant building API
- Tenant feature-flag API
- Tenancy seed script
- Tenancy tests

## Required schema integration

Merge `prisma/phase31-additions.prisma` into the active schema.

The existing `Workspace` model needs:

```prisma
organizationId String?
organization   Organization? @relation(fields: [organizationId], references: [id], onDelete: Cascade)

memberships    WorkspaceMembership[]
buildingAccess BuildingAccess[]
featureFlags   WorkspaceFeatureFlag[]
locale         WorkspaceLocale?
```

The existing `LocalUser` model needs:

```prisma
organizationMemberships OrganizationMembership[]
workspaceMemberships    WorkspaceMembership[]
buildingAccess           BuildingAccess[]
```

The existing `Building` model needs:

```prisma
buildingAccess BuildingAccess[]
```

## Security rule

Every business query must filter by the active tenant context. Direct `findMany()` calls without `workspaceId` filtering should be treated as unsafe.
