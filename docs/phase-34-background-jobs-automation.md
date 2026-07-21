# Phase 34 — Background Jobs & Automation

Delivered:

- Durable SQLite-backed queue
- Job claiming and locking
- Retry with exponential backoff and jitter
- Maximum-attempt enforcement
- Job attempt history
- Scheduled reports
- Recurring maintenance generation
- Low-stock evaluation
- Observability metric collection
- Automation rules
- Idempotency keys
- Job cancellation
- Job dashboard
- Admin scheduling and processing APIs
- CLI worker and scheduler
- Unit tests

## Required schema integration

Merge `prisma/phase34-additions.prisma` into the active schema.

Add this relation:

```prisma
BackgroundJob {
  attemptsHistory JobAttempt[]
}
```

And to Workspace:

```prisma
automationRules AutomationRule[]
```

## Running locally

```bash
npm run jobs:schedule
npm run jobs:work
```

No external queue, Redis or paid service is required.
