export async function login(page, { email, password }) {
  await page.goto("/login");

  await page.getByTestId("email-input").fill(email);
  await page.getByTestId("password-input").fill(password);

  await page.click('button[type="submit"]');
}

export async function createProject(page, projectName) {
  await page.getByTestId("add-project-btn").click();
  await page.getByTestId("project-title-input").fill(projectName);
  await page.getByTestId("create-project-btn").click();
}

export async function createTask(page, { title, desc, status = "TODO" }) {
  await page.getByTestId(`add-${status}-task-btn`).click();

  await page.getByTestId("task-title-input").fill(title);
  await page.getByTestId("task-desc-input").fill(desc);

  await page.getByTestId("create-task-btn").click();
}
