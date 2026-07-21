import { describe, expect, it } from "vitest";
import { roleDashboards } from "@/features/ux/role-dashboard";

describe("role dashboards", () => {
  it("provides distinct admin and viewer experiences", () => {
    expect(roleDashboards.admin.title).not.toBe(roleDashboards.viewer.title);
  });
});
