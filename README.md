# GridMind

GridMind is a local-first energy management and simulation platform for buildings, campuses and light industrial facilities.

## Phase 04

This package includes the production foundation, GridMind design system and complete public marketing experience.

## Requirements

- Node.js 20.9+
- npm

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

No API key or external account is required.

## Quality commands

```bash
npm run typecheck
npm run lint
npm run build
```


## Local database

GridMind uses SQLite and Prisma without external accounts or API keys. After installing dependencies:

```bash
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

The deterministic seed creates a campus, buildings, zones, devices, meters, readings, an alert, a goal, a scenario and an energy recommendation.
