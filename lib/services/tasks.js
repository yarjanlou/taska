import { pb } from "../pocketbase";

export async function createTask({
  title,
  description,
  deadline,
  images,
  status,
  selectedProject,
}) {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("project", selectedProject);
    formData.append("status", status);
    if (deadline) {
      formData.append("deadline", deadline.toISOString());
    }
    if (images.length > 0) {
      images.forEach((file) => formData.append("images", file));
    }

    const taskData = await pb.collection("tasks").create(formData);

    return taskData;
  } catch (err) {
    console.error(err);
  }
}

export async function getTasksByProject(projectId) {
  try {
    const tasks = await pb.collection("tasks").getFullList(200, {
      filter: `project="${projectId}"`,
      sort: "-created",
    });
    return tasks;
  } catch (err) {
    console.error(err);
  }
}
