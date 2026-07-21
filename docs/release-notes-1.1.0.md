# GridMind Enterprise 1.1.0

This release consolidates the enterprise architecture introduced across Phases 28–38.

## Highlights

- Restored consolidated Prisma schema
- Multi-tenant organization and workspace model
- Security and local identity hardening
- Persistent enterprise workflows
- Background jobs and automation
- Observability and compliance
- Performance and scale controls
- Deployment and disaster recovery assets
- Enterprise onboarding and global search

## Known operational boundary

SQLite supports one active application host. Use PostgreSQL before enabling multiple application replicas.
