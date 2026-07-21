import {
  BarChart3,
  BrainCircuit,
  Building2,
  Boxes,
  Cpu,
  FileSpreadsheet,
  FileText,
  Gauge,
  Leaf,
  Map,
  Rocket,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Target,
  Wrench
} from "lucide-react";

export const navigationGroups = [
  {
    label: "Monitor",
    items: [
      { label: "Overview", href: "/dashboard", icon: Gauge },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { label: "Intelligence", href: "/dashboard/intelligence", icon: BrainCircuit }
    ]
  },
  {
    label: "Manage",
    items: [
      { label: "Buildings", href: "/dashboard/buildings", icon: Building2 },
      { label: "Assets", href: "/dashboard/assets", icon: Cpu },
      { label: "Data ingestion", href: "/dashboard/data-ingestion", icon: FileSpreadsheet },
      { label: "Maintenance", href: "/dashboard/maintenance", icon: Wrench }
    ]
  },
  {
    label: "Optimize",
    items: [
      { label: "Scenarios", href: "/dashboard/scenarios", icon: SlidersHorizontal },
      { label: "Cost & carbon", href: "/dashboard/cost-carbon", icon: Leaf },
      { label: "Goals", href: "/dashboard/goals", icon: Target }
    ]
  },
  {
    label: "Visualize",
    items: [
      { label: "2D energy map", href: "/dashboard/energy-map", icon: Map },
      { label: "3D digital twin", href: "/dashboard/digital-twin", icon: Boxes }
    ]
  },
  {
    label: "Operate",
    items: [
      { label: "Operations", href: "/dashboard/operations", icon: Boxes },
      { label: "Reports", href: "/dashboard/reports", icon: FileText }
    ]
  },
  {
    label: "System",
    items: [
      { label: "Administration", href: "/dashboard/admin", icon: ShieldCheck },
      { label: "Settings", href: "/dashboard/settings", icon: Settings2 },
      { label: "Release", href: "/dashboard/release", icon: Rocket }
    ]
  }
] as const;
