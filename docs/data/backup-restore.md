# Local backup and restore

After `npm install`, generate and seed the database:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

Create a timestamped backup with `npm run db:backup`. Restore one with:

```bash
npm run db:restore -- backups/gridmind-<timestamp>.db
```

Stop the development server before restoring. Backups are intentionally excluded from version control.
