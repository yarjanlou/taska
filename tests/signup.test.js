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
