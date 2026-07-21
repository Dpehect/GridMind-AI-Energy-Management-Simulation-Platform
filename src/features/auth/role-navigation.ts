import type { AppRole } from "./types";

const hiddenByRole: Record<AppRole, string[]> = {
  admin: [],
  energy_manager: ["/dashboard/admin"],
  facility_manager: [
    "/dashboard/admin",
    "/dashboard/settings",
    "/dashboard/release"
  ],
  analyst: [
    "/dashboard/admin",
    "/dashboard/settings",
    "/dashboard/release",
    "/dashboard/maintenance"
  ],
  viewer: [
    "/dashboard/admin",
    "/dashboard/settings",
    "/dashboard/release",
    "/dashboard/maintenance",
    "/dashboard/data-ingestion"
  ]
};

export function canSeeNavigationItem(
  role: AppRole,
  href: string
) {
  return !hiddenByRole[role].some(
    (hidden) => href === hidden || href.startsWith(`${hidden}/`)
  );
}
