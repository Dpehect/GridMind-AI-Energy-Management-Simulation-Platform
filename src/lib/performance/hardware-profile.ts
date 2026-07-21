export type HardwareProfile =
  | "constrained"
  | "balanced"
  | "high_performance";

export function detectHardwareProfile(input: {
  hardwareConcurrency?: number;
  deviceMemory?: number;
  reducedMotion?: boolean;
}): HardwareProfile {
  if (input.reducedMotion) return "constrained";

  const cores = input.hardwareConcurrency ?? 4;
  const memory = input.deviceMemory ?? 4;

  if (cores <= 4 || memory <= 4) {
    return "constrained";
  }

  if (cores >= 8 && memory >= 8) {
    return "high_performance";
  }

  return "balanced";
}

export function performanceFeatures(
  profile: HardwareProfile
) {
  return {
    enablePostProcessing:
      profile === "high_performance",
    chartAnimation:
      profile !== "constrained",
    maxVisible3dDevices:
      profile === "constrained"
        ? 100
        : profile === "balanced"
          ? 500
          : 2000,
    shadowQuality:
      profile === "high_performance"
        ? "high"
        : profile === "balanced"
          ? "medium"
          : "off"
  };
}
