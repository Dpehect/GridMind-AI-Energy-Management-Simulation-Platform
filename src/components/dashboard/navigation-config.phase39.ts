import {
  Activity,
  BarChart3,
  Boxes,
  Building2,
  ClipboardCheck,
  Cpu,
  FileCheck2,
  Gauge,
  Layers3,
  Rocket,
  Search,
  Settings2,
  ShieldCheck,
  Smartphone,
  Workflow
} from "lucide-react";

export const enterpriseNavigationAdditions = [
  {
    label: "Enterprise",
    items: [
      { label: "Organization", href: "/dashboard/organization", icon: Layers3 },
      { label: "Workflows", href: "/dashboard/workflows", icon: Workflow },
      { label: "Jobs", href: "/dashboard/jobs", icon: ClipboardCheck },
      { label: "Observability", href: "/dashboard/observability", icon: Activity },
      { label: "Compliance", href: "/dashboard/compliance", icon: FileCheck2 },
      { label: "Performance", href: "/dashboard/performance", icon: Gauge },
      { label: "Onboarding", href: "/dashboard/onboarding", icon: Rocket },
      { label: "Technician", href: "/dashboard/technician", icon: Smartphone },
      { label: "Enterprise UX", href: "/dashboard/ux", icon: Search }
    ]
  }
] as const;
