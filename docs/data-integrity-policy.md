# GridMind Data Integrity Policy

## Mutations

Critical mutations must:

1. Validate input.
2. Verify workspace ownership.
3. Run inside a transaction.
4. Reject stale updates.
5. Write an audit event.
6. Create an entity version when historical reconstruction is required.

## Imports

- Files are identified by SHA-256.
- Reprocessing the same file is rejected.
- Rows are hashed independently.
- Duplicate rows are recorded rather than silently inserted.
- Failed rows remain inspectable.

## Deletion

Business entities should use soft deletion unless legal or operational policy requires permanent removal.

## Backup

- Every backup is checksummed.
- Verification must run before restore.
- Restore creates a pre-restore copy.
- Backup files must be stored outside the application source directory in production.
