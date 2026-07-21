# Tenant Isolation Guide

## Required pattern

Every repository begins by resolving:

```ts
const context = await getTenantContext();
```

Then every query includes:

```ts
where: {
  workspaceId: context.workspaceId
}
```

## Building access

Users without workspace-wide authority receive explicit `BuildingAccess` grants.

## Workspace switch

The selected workspace is stored in an HttpOnly cookie and validated against active membership on every request.

## Feature flags

Feature availability is stored per workspace. A feature enabled in one tenant does not imply availability in another.

## Locale

Currency, timezone and unit-system formatting must use the active workspace locale rather than global constants.
