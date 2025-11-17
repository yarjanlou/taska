// @ts-check
import { test, expect } from "@playwright/test";

const fields = (page) => ({
  email: page.getByTestId("email-input"),
  password: page.getByTestId("password-input"),
  submit: page.getByRole("button", { name: /log in/i }),
});

async function login(page, { email, password }) {
  const f = fields(page);

  await f.email.fill(email);
  await f.password.fill(password);
  await f.submit.click();
}

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.getByTestId("email-error")).toHaveText(
      "email is required.",
    );
    await expect(page.getByTestId("password-error")).toHaveText(
      "password is required.",
    );
  });

  test("shows password length error", async ({ page }) => {
    await login(page, { email: "test@mail.com", password: "short" });

    await expect(page.getByTestId("password-error")).toHaveText(
      "password must be at least 8 characters.",
    );
  });

  test("fails with wrong credentials", async ({ page }) => {
    await login(page, { email: "wrong@mail.com", password: "password123" });

    await expect(
      page.getByText("No account found with this email or password"),
    ).toBeVisible();
  });

  test("logs in successfully and redirects to dashboard", async ({ page }) => {
    await login(page, { email: "r.yar@gmail.com", password: "11111111" });

    await expect(page).toHaveURL("/dashboard");
  });
});
