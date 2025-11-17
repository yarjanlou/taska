// @ts-check
import { test, expect } from "@playwright/test";

test.describe("Protected Route", () => {
  test("redirects unauthenticated user to login", async ({ page }) => {
    await page.goto("/dashboard");

    await expect(page).toHaveURL("/login");
  });
});
