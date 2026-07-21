import { describe, expect, it } from "vitest";
import { canSeeNavigationItem } from "@/features/auth/role-navigation";

describe("role-aware navigation", () => {
  it("hides administration from viewers", () => {
    expect(
      canSeeNavigationItem("viewer", "/dashboard/admin")
    ).toBe(false);
  });

  it("shows administration to admins", () => {
    expect(
      canSeeNavigationItem("admin", "/dashboard/admin")
    ).toBe(true);
  });
});
