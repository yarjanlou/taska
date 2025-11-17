// @ts-check
import { test, expect } from "@playwright/test";

test("shows validation errors on empty submit", async ({ page }) => {
  await page.goto("/login");

  await page.click('button[type="submit"]');

  await expect(page.getByTestId("email-error")).toHaveText(
    "email is required.",
  );
  await expect(page.getByTestId("password-error")).toHaveText(
    "password is required.",
  );
});

test("shows password length error", async ({ page }) => {
  await page.goto("/login");

  await page.getByTestId("email-input").fill("test@mail.com");
  await page.getByTestId("password-input").fill("short");

  await page.click('button[type="submit"]');

  await expect(page.getByTestId("password-error")).toHaveText(
    "password must be at least 8 characters.",
  );
});

test("fails with wrong credentials", async ({ page }) => {
  await page.goto("/login");

  await page.getByTestId("email-input").fill("wrong@mail.com");
  await page.getByTestId("password-input").fill("password123");

  await page.click('button[type="submit"]');

  await expect(
    page.getByText("No account found with this email or password"),
  ).toBeVisible();
});

test("user logs in successfully and redirects to dashboard", async ({
  page,
}) => {
  await page.goto("/login");

  await page.getByTestId("email-input").fill("r.yar@gmail.com");
  await page.getByTestId("password-input").fill("11111111");

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL("/dashboard");
});
