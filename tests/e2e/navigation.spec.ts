import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@gridmind.local");
  await page.getByLabel("Password").fill("GridMindAdmin2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
});

test("desktop navigation exposes core modules", async ({ page }) => {
  await expect(page.getByRole("link", { name: "Analytics" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Operations" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Release" })).toBeVisible();
});

test("mobile navigation opens and closes", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByText("GridMind Navigation")).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(page.getByText("GridMind Navigation")).not.toBeVisible();
});
