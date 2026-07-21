# Observability Operations Guide

## Health

- `/api/health`
- `/api/health/live`
- `/api/health/ready`

## Diagnostics

Run:

```bash
npm run diagnostics:run
```

## Logs

Rotate according to retention policy:

```bash
npm run logs:rotate
```

Export support data:

```bash
npm run logs:export
```

## Incident response

1. Record the request ID.
2. Search runtime logs by request ID.
3. Review the grouped error incident.
4. Check the latest diagnostic run.
5. Verify database latency and resource usage.
6. Resolve the incident and document the root cause.
