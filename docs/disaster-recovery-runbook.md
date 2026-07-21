# GridMind Disaster Recovery Runbook

## Recovery objectives

Define per organization:

- Recovery Point Objective
- Recovery Time Objective
- Backup retention
- Off-host backup copy frequency

## Backup verification

1. Confirm the latest backup record is `verified`.
2. Run `npm run db:test-restore -- /path/to/backup.db`.
3. Copy verified backups to a separate host or encrypted storage.

## Application rollback

1. Stop worker and scheduler.
2. Activate the previous application release.
3. Run schema compatibility check.
4. Restore the database only if the previous release cannot use the current schema.
5. Start the application.
6. Verify `/api/health/ready`.
7. Start scheduler and worker.
8. Review error incidents and audit logs.

## Incident evidence

Preserve:

- runtime logs
- error incidents
- job history
- release version
- database checksum
- latest diagnostic run
