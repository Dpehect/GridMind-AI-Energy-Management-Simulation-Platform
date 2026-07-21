import { expect, test } from "@playwright/test";

test("viewer cannot open administration", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("viewer@gridmind.local");
  await page.getByLabel("Password").fill("GridMindViewer2026!");
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.goto("/dashboard/admin");
  await expect(page).toHaveURL(/\/forbidden/);
});
