import { describe, expect, it } from "vitest";
import { buildBreadcrumbs } from "@/features/ux/breadcrumbs";

describe("breadcrumbs", () => {
  it("builds nested route labels", () => {
    const items = buildBreadcrumbs("/dashboard/settings/security");
    expect(items.map((item) => item.label)).toEqual([
      "Dashboard",
      "Settings",
      "Security"
    ]);
  });
});
