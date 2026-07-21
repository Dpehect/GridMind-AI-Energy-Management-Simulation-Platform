# Phase 36 — Performance & Scale

Delivered:

- Cursor pagination
- Page-size enforcement
- Reading pagination repository
- Virtualized table component
- Streaming CSV export
- Batch reading iterator
- Dynamic 3D and analytics loading
- Hardware-profile detection
- Low-hardware feature policy
- Server cache helper
- Query profiling
- Repository benchmarks
- Performance dashboard
- Bundle-analysis script
- Index-audit script
- Scale-focused tests

## Required schema integration

Review and merge the indexes from `prisma/phase36-indexes.prisma`.

## Scale targets

The architecture is prepared for:

- 100 buildings
- 10,000 devices
- 1,000,000 readings
- 100,000-row CSV exports
- Large operational tables

These targets still require benchmark verification using production-like hardware and data.
