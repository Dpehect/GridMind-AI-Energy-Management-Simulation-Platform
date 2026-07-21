import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("facility@gridmind.local");
  await page.getByLabel("Password").fill("GridMindFacility2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

test("facility manager can reach maintenance workflow", async ({ page }) => {
  await page.goto("/dashboard/maintenance");
  await expect(page).toHaveURL(/maintenance/);
  await expect(page.getByRole("heading")).toBeVisible();
});
