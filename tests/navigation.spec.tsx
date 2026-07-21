import { describe, expect, it } from "vitest";
import { navigationGroups } from "@/components/dashboard/navigation-config";

describe("navigation configuration", () => {
  it("exposes analytics, operations and release routes", () => {
    const routes = navigationGroups.flatMap((group) => group.items.map((item) => item.href));
    expect(routes).toContain("/dashboard/analytics");
    expect(routes).toContain("/dashboard/operations");
    expect(routes).toContain("/dashboard/release");
  });
});
