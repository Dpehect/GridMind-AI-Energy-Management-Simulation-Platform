export const designTokens = {
  radius: { xs: "0.5rem", sm: "0.75rem", md: "1rem", lg: "1.5rem", xl: "2rem" },
  duration: { instant: 0.12, fast: 0.2, normal: 0.32, slow: 0.5 },
  easing: {
    standard: [0.22, 1, 0.36, 1],
    emphasized: [0.16, 1, 0.3, 1],
  },
  chart: {
    energy: "var(--chart-energy)",
    cost: "var(--chart-cost)",
    carbon: "var(--chart-carbon)",
    warning: "var(--chart-warning)",
    critical: "var(--chart-critical)",
  },
} as const;
