# Phase 30 — Security & Identity Hardening

Delivered:

- Password complexity policy
- Login failure tracking
- Brute-force lockout
- Security event persistence
- Session limits
- Session revocation
- Revoke-all-devices flow
- Password change flow
- User creation and disable actions
- Role-aware navigation
- Security settings screen
- Security events API
- CSRF token utility
- Production-safe session controls
- Security-focused unit tests

## Required schema integration

Merge the models from `prisma/phase30-additions.prisma` into the active Prisma schema.

## Important production requirement

Set a strong secret:

```env
GRIDMIND_CSRF_SECRET="long-random-secret"
```

## Login integration

Replace the existing login action used by the login form with `loginActionV2`.

## Sidebar integration

Use `SidebarV2` or port its role filtering into the active sidebar.
