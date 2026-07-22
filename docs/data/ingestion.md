# Energy Data Ingestion

GridMind accepts local CSV and manual meter readings. Required CSV columns are `meterSerial`, `capturedAt`, and `value`; `quality` is optional. Timestamps must be ISO-8601 values with an offset. Values must be non-negative.

The browser creates a validation preview before any write. The server validates the payload again, resolves meter identities, and records the successful operation in `ActivityLog`. Unknown meters stop the batch. Duplicate database readings are skipped safely.

The implementation intentionally avoids cloud storage, external APIs, and API keys.
