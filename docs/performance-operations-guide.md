# Performance Operations Guide

## Database indexes

Run:

```bash
npm run audit:indexes
```

## Repository benchmark

Run:

```bash
npm run benchmark:performance
```

## Bundle analysis

Build first:

```bash
npm run build
npm run analyze:bundle
```

## Large exports

Reading exports stream CSV data in batches and do not hold the full dataset in memory.

## Frontend

Use dynamic imports for Three.js and heavy charting modules. Large tables should use virtualization rather than rendering every row.
