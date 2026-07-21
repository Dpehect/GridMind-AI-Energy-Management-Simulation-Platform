import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gridmind.local");
  await page.getByLabel("Password").fill("GridMindAdmin2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

test("observability dashboard renders reliability metrics", async ({ page }) => {
  await page.goto("/dashboard/observability");
  await expect(page.getByText("Observability & Reliability")).toBeVisible();
  await expect(page.getByText("Open incidents")).toBeVisible();
});
