const labels: Record<string, string> = {
  dashboard: "Dashboard",
  buildings: "Buildings",
  assets: "Assets",
  analytics: "Analytics",
  operations: "Operations",
  maintenance: "Maintenance",
  reports: "Reports",
  goals: "Goals",
  organization: "Organization",
  workflows: "Workflows",
  jobs: "Jobs",
  observability: "Observability",
  compliance: "Compliance",
  performance: "Performance",
  settings: "Settings",
  security: "Security"
};

export function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    label: labels[segment] ?? segment.replaceAll("-", " "),
    href: `/${segments.slice(0, index + 1).join("/")}`
  }));
}
