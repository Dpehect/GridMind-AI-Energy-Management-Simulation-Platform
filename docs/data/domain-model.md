# GridMind domain model

Phase 04 establishes a local-first energy operations model around Workspace, Building, Floor, Zone, Meter, Device and Reading. Operational records—alerts, maintenance, goals, scenarios, recommendations, reports and activity logs—reference those core assets.

## Integrity rules

- Workspace slugs and building codes are unique within their scope.
- Meter serial numbers and device asset tags are globally unique in a local installation.
- A reading is unique for a meter and timestamp.
- Building deletion is soft by default; child records use explicit relational delete behavior.
- All local analysis results must retain evidence and confidence metadata when available.
