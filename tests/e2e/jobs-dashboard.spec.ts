import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gridmind.local");
  await page.getByLabel("Password").fill("GridMindAdmin2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

test("jobs dashboard displays queue metrics", async ({ page }) => {
  await page.goto("/dashboard/jobs");
  await expect(page.getByText("Background Jobs & Automation")).toBeVisible();
  await expect(page.getByText("Queued")).toBeVisible();
  await expect(page.getByText("Failed")).toBeVisible();
});
