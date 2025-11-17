// @ts-check
import { test, expect } from "@playwright/test";

test("shows validation errors on empty submit", async ({ page }) => {
  await page.goto("/signup");

  await page.getByRole("button", { name: /sign up/i }).click();

  await expect(page.getByTestId("email-error")).toHaveText(
    "email is required.",
  );
  await expect(page.getByTestId("name-error")).toHaveText("name is required.");
  await expect(page.getByTestId("password-error")).toHaveText(
    "password is required.",
  );
});

test("shows password length error", async ({ page }) => {
  await page.goto("/signup");

  await page.getByTestId("email-input").fill("user@mail.com");
  await page.getByTestId("name-input").fill("Reihaneh");
  await page.getByTestId("password-input").fill("short");

  await page.getByRole("button", { name: /sign up/i }).click();

  await expect(page.getByTestId("password-error")).toHaveText(
    "password must be at least 8 characters.",
  );
});

test("signs up → auto-login → redirects to dashboard", async ({ page }) => {
  await page.goto("/signup");

  const uniqueEmail = `user${Date.now()}@mail.com`;

  const email = page.getByTestId("email-input");
  const name = page.getByTestId("name-input");
  const password = page.getByTestId("password-input");

  // await Promise.all([email.waitFor(), name.waitFor(), password.waitFor()]);

  await email.fill(uniqueEmail);
  await name.fill("Test User");
  await password.fill("password123");

  await page.getByRole("button", { name: /sign up/i }).click();
  await expect(page).toHaveURL("/dashboard");
});
