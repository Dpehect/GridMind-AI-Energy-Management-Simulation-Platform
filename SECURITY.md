# Security Policy

GridMind Phase 01 contains no external secrets and requires no API keys. Report security concerns privately to the project maintainer.

## Baseline controls

- Strict input validation with Zod
- No secrets committed to source control
- Secure response headers
- Dependency pinning through the lockfile after installation
- Local-first data mode
- No telemetry by default
