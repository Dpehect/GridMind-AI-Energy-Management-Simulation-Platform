# Architecture

GridMind uses a modular Next.js App Router architecture. The application is split into public marketing routes, protected-style application routes, reusable UI primitives, domain modules, and infrastructure utilities. Phase 01 uses deterministic local demo data; later phases will introduce SQLite persistence behind repository interfaces.

## Boundaries

- `src/app`: route composition and layouts
- `src/components`: reusable visual components
- `src/features`: domain-owned UI and logic
- `src/lib`: shared utilities, configuration and validation
- `src/data`: deterministic fixtures only
- `src/styles`: design and motion tokens

Server components are the default. Client components are used only for browser state, motion, theme, and interaction.
