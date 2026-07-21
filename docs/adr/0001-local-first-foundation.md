# ADR 0001: Local-first foundation

## Status
Accepted

## Decision
GridMind runs without API keys or external accounts. Phase 01 uses deterministic fixtures; persistence will use SQLite behind repository boundaries.

## Consequences
The application remains portable and inexpensive, while future hosted adapters can be added without replacing domain logic.
