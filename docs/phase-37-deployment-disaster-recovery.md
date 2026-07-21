# Phase 37 — Deployment & Disaster Recovery

Delivered:

- Production multi-stage Docker build
- Standalone Next.js output guidance
- Docker Compose application stack
- Dedicated worker, scheduler and backup services
- Persistent data, backup and log volumes
- Liveness and readiness healthchecks
- Nginx reverse proxy example
- systemd service definitions
- Graceful shutdown handling
- Database schema compatibility endpoint
- Production preflight script
- Backup rotation
- Restore smoke test
- Upgrade compatibility check
- Release activation script
- Rollback script

## Supported deployments

- Single Linux server
- Company intranet server
- Docker host
- systemd-managed Node.js host

## SQLite boundary

This architecture is suitable for a single active application host. Multi-host horizontal scaling requires PostgreSQL or another shared transactional database.
