// @ts-check
import { expect, test } from "@playwright/test";
import { createProject, createTask, login } from "./helpers/flow";
import { dragAndDropDndKit } from "./helpers/drag";

const taskFields = (page, status) => ({
  addBtn: page.getByTestId(`add-${status}-task-btn`),
  dialog: page.getByTestId("task-dialog"),
  titleInput: page.getByTestId("task-title-input"),
  descInput: page.getByTestId("task-desc-input"),
  createBtn: page.getByTestId("create-task-btn"),
  cancelBtn: page.getByTestId("cancel-task-btn"),
});

const statuses = ["TODO", "INPROGRESS", "DONE"];

test.describe("Tasks", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, { email: "r.yar@gmail.com", password: "11111111" });

    const projectName = "Project " + Date.now();
    await createProject(page, projectName);
    await expect(
      page.locator(`[data-testid="project-card"]`, { hasText: projectName }),
    ).toBeVisible();
  });

  test("cannot create task with empty title and description", async ({
    page,
  }) => {
    const tf = taskFields(page, "TODO");

    await tf.addBtn.click();
    await expect(tf.dialog).toBeVisible();

    await tf.createBtn.click();

    await expect(tf.titleInput).toHaveAttribute("aria-invalid", "true");
    await expect(tf.descInput).toHaveAttribute("aria-invalid", "true");

    await expect(tf.dialog).toBeVisible();
  });

  test("cannot create task with empty title", async ({ page }) => {
    const tf = taskFields(page, "TODO");

    await tf.addBtn.click();
    await expect(tf.dialog).toBeVisible();
    await tf.descInput.fill("description");
    await tf.createBtn.click();
    await expect(tf.titleInput).toHaveAttribute("aria-invalid", "true");
    await expect(tf.dialog).toBeVisible();
  });

  test("cannot create task with empty description", async ({ page }) => {
    const tf = taskFields(page, "TODO");
    const taskName = `Task ${Date.now()}`;

    await tf.addBtn.click();
    await expect(tf.dialog).toBeVisible();
    await tf.titleInput.fill(taskName);
    await tf.createBtn.click();
    await expect(tf.descInput).toHaveAttribute("aria-invalid", "true");
    await expect(tf.dialog).toBeVisible();
  });

  test("add task buttons are enabled", async ({ page }) => {
    for (const status of statuses) {
      const tf = taskFields(page, status);
      await expect(tf.addBtn).toBeEnabled();
    }
  });

  test("create tasks for all statuses", async ({ page }) => {
    for (const status of statuses) {
      const tf = taskFields(page, status);
      const taskName = `Task ${status} ${Date.now()}`;

      await tf.addBtn.click();
      await expect(tf.dialog).toBeVisible();
      await tf.titleInput.fill(taskName);
      await tf.descInput.fill("description");
      await tf.createBtn.click();

      await expect(tf.dialog).not.toBeVisible();
      await expect(page.getByText(taskName)).toBeVisible();
    }
  });

//   test("create task and drag to in-progress", async ({ page }) => {
//     const taskName = "Task " + Date.now();

//     await createTask(page, { title: taskName, desc: "desc", status: "TODO" });

//     const taskCard = page.locator('[data-testid="task-card"]', {
//       hasText: taskName,
//     });
//     await taskCard.scrollIntoViewIfNeeded();
//     await expect(taskCard).toBeVisible();

//     const inProgressColumn = page.getByTestId("INPROGRESS-column");

//     await dragAndDropDndKit(page, taskCard, inProgressColumn);

//     const movedTask = inProgressColumn.locator('[data-testid="task-card"]', {
//       hasText: taskName,
//     });

//     await expect(movedTask).toBeVisible();
//   });

  test("cancel button closes task dialog", async ({ page }) => {
    const tf = taskFields(page, "TODO");

    await tf.addBtn.click();
    await expect(tf.dialog).toBeVisible();

    await tf.cancelBtn.click();
    await expect(tf.dialog).not.toBeVisible();
  });
});
