# Phase 11 — 2D Building Energy Map

This phase introduces a local-first interactive floor-plan workspace with zone intensity overlays, device markers, alert states, floor selection, zoom controls, selection state, and undo-ready history primitives.

## Routes
- `/dashboard/energy-map`

## Architecture
- `src/data/energy-map-demo.ts`: deterministic local map fixtures
- `src/features/energy-map/use-energy-map-store.ts`: Zustand interaction state
- `src/components/energy-map/*`: map, controls, floor selection and detail panel

No external map service, API key, account, or hosted dependency is required.
