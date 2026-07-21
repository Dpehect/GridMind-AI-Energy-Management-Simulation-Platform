# Runtime Troubleshooting

## Startup fails before the dashboard loads

Run:

```bash
npm run env:validate
npm run runtime:doctor
```

Confirm that `DATABASE_URL` points to a writable SQLite location.

## Duplicate route warning

Run:

```bash
npm run check:routes
```

Remove duplicate `page`, `route` or manifest implementations.

## Works on Windows but fails on Linux

Run:

```bash
npm run check:imports
```

The command validates case-sensitive relative and alias imports.

## Health endpoint returns 503

Open `/api/health` and inspect failed checks. Database and environment failures are reported separately.

## Bootstrap administrator

Set both:

```env
GRIDMIND_BOOTSTRAP_ADMIN_EMAIL="admin@example.com"
GRIDMIND_BOOTSTRAP_ADMIN_PASSWORD="use-a-long-unique-password"
```

Start the application once, confirm the account exists, then remove the bootstrap password from the environment.
