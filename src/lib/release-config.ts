export const releaseConfig = {
  name: "GridMind",
  version: "1.0.0-rc.1",
  releaseChannel: "release-candidate",
  localFirst: true,
  externalApiKeysRequired: false,
  offlineCapable: true,
  supportedNode: ">=20.9.0",
  features: [
    "energy-command-center",
    "local-intelligence",
    "scenario-simulation",
    "2d-energy-map",
    "3d-digital-twin",
    "cost-carbon-intelligence",
    "maintenance",
    "goals",
    "reporting-studio",
    "enterprise-platform-core",
    "analytics-suite",
    "operations-suite"
  ]
} as const;
