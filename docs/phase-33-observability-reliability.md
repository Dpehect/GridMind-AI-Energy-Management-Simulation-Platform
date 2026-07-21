# Phase 33 — Observability & Reliability

Delivered:

- Async request context
- Request and correlation IDs
- Structured persistent logs
- Slow-query monitoring
- Query-error logging
- Grouped error incidents
- Error fingerprinting
- Runtime resource metrics
- Diagnostic runs
- Log retention
- Observability export
- Observability dashboard
- Logs, incidents, metrics and diagnostics APIs
- Middleware integration sample
- Unit tests

## Required schema integration

Merge `prisma/phase33-additions.prisma` into the active schema.

## Middleware integration

Merge the request/correlation ID behavior from `src/middleware.phase33.ts` into the active `src/middleware.ts`.

## Production principle

Observability failures must never cause business-operation failures. Logging functions intentionally swallow persistence errors after emitting console output.
