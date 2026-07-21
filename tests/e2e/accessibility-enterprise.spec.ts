import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/dashboard/organization",
  "/dashboard/workflows",
  "/dashboard/jobs",
  "/dashboard/observability",
  "/dashboard/settings/security"
];

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gridmind.local");
  await page.getByLabel("Password").fill("GridMindAdmin2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

for (const route of routes) {
  test(`${route} has no critical accessibility violations`, async ({ page }) => {
    await page.goto(route);

    const results = await new AxeBuilder({ page })
      .disableRules(["color-contrast"])
      .analyze();

    const critical = results.violations.filter(
      (violation) => violation.impact === "critical"
    );

    expect(critical).toEqual([]);
  });
}
