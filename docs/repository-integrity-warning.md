# Repository integrity warning

The Phase 15 GitHub commit removed several files from earlier phases, including documentation and application routes. This Phase 16 archive does not intentionally delete any existing files.

Before merging:
1. Keep a copy of the repository.
2. Extract with **Merge**, not replace-folder.
3. Review Git status after extraction.
4. Do not commit unexpected deletions.
5. Restore missing earlier routes from the last known good commit if Git shows them as deleted.

Recommended recovery base for earlier phase files: commit `2d60d3742a9c7d1791f471859b71a2444b6b7b34`.
