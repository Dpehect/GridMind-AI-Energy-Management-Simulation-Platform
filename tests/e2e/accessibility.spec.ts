import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gridmind.local");
  await page.getByLabel("Password").fill("GridMindAdmin2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

for (const route of [
  "/dashboard",
  "/dashboard/analytics",
  "/dashboard/operations",
  "/dashboard/reports",
  "/dashboard/maintenance"
]) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? "")
    );
    expect(serious).toEqual([]);
  });
}
