# Production Deployment Guide

## Docker

```bash
docker compose -f docker-compose.enterprise.yml build
docker compose -f docker-compose.enterprise.yml up -d
```

## Verification

```bash
curl http://localhost:3000/api/health/live
curl http://localhost:3000/api/health/ready
curl http://localhost:3000/api/health/schema
```

## Before launch

- Disable demo users.
- Configure a strong CSRF secret.
- Remove bootstrap password after account creation.
- Place the application behind HTTPS.
- Restrict backup and database volume access.
- Test graceful shutdown.
- Test backup restore.
- Test application rollback.
