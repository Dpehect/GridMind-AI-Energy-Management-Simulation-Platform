import { expect, test } from "@playwright/test";

test("liveness endpoint responds", async ({ request }) => {
  const response = await request.get("/api/health/live");
  expect(response.ok()).toBe(true);

  const body = await response.json();
  expect(body.status).toBe("alive");
});

test("readiness endpoint returns structured checks", async ({ request }) => {
  const response = await request.get("/api/health/ready");
  expect([200, 503]).toContain(response.status());

  const body = await response.json();
  expect(body).toHaveProperty("checks");
});
