import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gridmind.local");
  await page.getByLabel("Password").fill("GridMindAdmin2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

test("organization portfolio is available to administrators", async ({ page }) => {
  await page.goto("/dashboard/organization");
  await expect(page.getByRole("heading", { name: /organization portfolio/i }))
    .toBeVisible();
});
