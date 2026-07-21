# ADR 0002: SQLite and Prisma domain layer

## Decision

Use SQLite as the zero-account local persistence engine and Prisma as the typed data-access boundary. Route components do not call Prisma directly; repositories and services isolate persistence from presentation.

## Consequences

The project remains API-key free and easy to run locally. Later deployment targets may substitute another relational provider behind the same service boundary, while SQLite remains the default portfolio and offline mode.
