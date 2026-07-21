# Asset management

Phase 05 introduces the building and asset-management domain interface. The hierarchy is Workspace → Building → Floor → Zone → Meter/Device. Forms are validated with Zod and React Hook Form, while all demo interactions remain local and deterministic.

## UX rules
- Building creation uses a focused modal workflow.
- Search and status filters update immediately without network calls.
- Building details preserve context across energy, zone and asset data.
- Tables remain horizontally scrollable on narrow screens.
