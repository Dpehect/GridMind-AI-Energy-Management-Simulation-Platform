export const APP_NAME = "GridMind";
export const APP_DESCRIPTION = "Local-first energy management and simulation platform.";

export const navigation = [
  { label: "Overview", href: "/dashboard" },
  { label: "Buildings", href: "/dashboard/buildings" },
  { label: "Intelligence", href: "/dashboard/intelligence" },
  { label: "Scenarios", href: "/dashboard/scenarios" },
  { label: "Reports", href: "/dashboard/reports" }
] as const;
