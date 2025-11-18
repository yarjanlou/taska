// @ts-check
import { test, expect } from "@playwright/test";

const fields = (page) => ({
  email: page.getByTestId("email-input"),
  name: page.getByTestId("name-input"),
  password: page.getByTestId("password-input"),
  submit: page.getByRole("button", { name: /sign up/i }),
});

async function signup(page, { email, name, password }) {
  const f = fields(page);

  await f.email.fill(email);
  await f.name.fill(name);
  await f.password.fill(password);

  await f.submit.click();
}

test.describe("Signup Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/signup");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.getByRole("button", { name: /sign up/i }).click();

    await expect(page.getByTestId("email-error")).toHaveText(
      "email is required.",
    );
    await expect(page.getByTestId("name-error")).toHaveText(
      "name is required.",
    );
    await expect(page.getByTestId("password-error")).toHaveText(
      "password is required.",
    );
  });

  test("email empty shows email error", async ({ page }) => {
    const f = fields(page);

    await f.name.fill("Reihaneh");
    await f.password.fill("password123");
    await f.submit.click();

    await expect(page.getByText("email is required.")).toBeVisible();
  });

  test("name empty shows name error", async ({ page }) => {
    const f = fields(page);

    await f.email.fill("test@gmail.com");
    await f.password.fill("password123");
    await f.submit.click();

    await expect(page.getByText("name is required.")).toBeVisible();
  });

  test("password empty shows password error", async ({ page }) => {
    const f = fields(page);

    await f.email.fill("test@gmail.com");
    await f.name.fill("Reihaneh");
    await f.submit.click();

    await expect(page.getByText("password is required.")).toBeVisible();
  });

  test("shows invalid email error", async ({ page }) => {
    const f = fields(page);

    await f.email.fill("test@gmail");
    await f.submit.click();

    await expect(page.getByText("please enter a valid email.")).toBeVisible();
  });

  test("shows password length error", async ({ page }) => {
    await signup(page, {
      email: "user@mail.com",
      name: "Reihaneh",
      password: "short",
    });

    await expect(page.getByTestId("password-error")).toHaveText(
      "password must be at least 8 characters.",
    );
  });

  test("fails signup when email is already in use", async ({ page }) => {
    const existingEmail = "r.yar@gmail.com";

    await signup(page, {
      email: existingEmail,
      name: "Test User",
      password: "password123",
    });

    const toast = page.getByText("This email is already in use.");

    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test("signs up → auto-login → redirects to dashboard", async ({ page }) => {
    const uniqueEmail = `user${Date.now()}@mail.com`;

    await signup(page, {
      email: uniqueEmail,
      name: "Test User",
      password: "password123",
    });

    await expect(page).toHaveURL("/dashboard");
  });
});
