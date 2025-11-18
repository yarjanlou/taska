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

  test("email empty shows email error", async ({ page }) => {
    const f = fields(page);

    await f.password.fill("password123");
    await f.submit.click();

    await expect(page.getByText("email is required.")).toBeVisible();
  });

  test("password empty shows password error", async ({ page }) => {
    const f = fields(page);

    await f.email.fill("test@gmil.com");
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
    await login(page, { email: "test@mail.com", password: "short" });

    await expect(page.getByTestId("password-error")).toHaveText(
      "password must be at least 8 characters.",
    );
  });

  test("fails with wrong credentials", async ({ page }) => {
    await login(page, { email: "wrong@mail.com", password: "password123" });

    const toast = page.getByText(
      "No account found with this email or password.",
    );

    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test("logs in successfully and redirects to dashboard", async ({ page }) => {
    await login(page, { email: "r.yar@gmail.com", password: "11111111" });

    await expect(page).toHaveURL("/dashboard");
  });
});
