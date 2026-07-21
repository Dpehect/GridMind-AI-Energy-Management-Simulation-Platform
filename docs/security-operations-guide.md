# Security Operations Guide

## Account lockouts

Five failed attempts within fifteen minutes lock further attempts temporarily.

## Session management

- Sessions expire after the configured absolute lifetime.
- Excess concurrent sessions are revoked automatically.
- Password changes revoke all sessions.
- Administrators may disable accounts and revoke their sessions.

## Security event monitoring

Use:

```text
GET /api/admin/security-events
```

Events include authentication lockouts, account creation, password changes and session revocation.

## CSRF

State-changing browser requests should include a session-bound CSRF token and verify it before mutation.

## Production

- Disable demo users.
- Configure a unique CSRF secret.
- Remove bootstrap administrator credentials after first startup.
- Use HTTPS.
- Protect backups and server logs.
