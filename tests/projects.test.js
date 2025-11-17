// @ts-check
import { test, expect } from "@playwright/test";
import { login } from "./helpers/flow";

const fields = (page) => ({
  addBtn: page.getByTestId("add-project-btn"),
  dialog: page.getByTestId("project-dialog"),
  titleInput: page.getByTestId("project-title-input"),
  createBtn: page.getByTestId("create-project-btn"),
  cancelBtn: page.getByTestId("cancel-project-btn"),
  titleError: page.getByTestId("project-title-error"),
});

test.describe("Projects", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, {
      email: "r.yar@gmail.com",
      password: "11111111",
    });
    await expect(page).toHaveURL("/dashboard");
  });

  test("cancel button closes the dialog", async ({ page }) => {
    const f = fields(page);

    await f.addBtn.click();
    await expect(f.dialog).toBeVisible();

    await f.cancelBtn.click();
    await expect(f.dialog).not.toBeVisible();
  });

  test("shows error when trying to create without title", async ({ page }) => {
    const f = fields(page);

    await f.addBtn.click();
    await f.createBtn.click();

    await expect(f.titleInput).toHaveAttribute("aria-invalid", "true");
  });

  test("creates a project successfully and appears in list", async ({
    page,
  }) => {
    const f = fields(page);
    const projectName = "Project " + Date.now();

    await f.addBtn.click();
    await expect(f.dialog).toBeVisible();

    await f.titleInput.fill(projectName);

    await f.createBtn.click();

    await expect(f.dialog).not.toBeVisible();

    await expect(
      page.locator(`[data-testid="project-card"]`, { hasText: projectName }),
    ).toBeVisible();
  });
});
