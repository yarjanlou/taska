import { pb } from "../pocketbase";

export async function createProject({ title, avatar }) {
  try {
    const projectData = await pb.collection("projects").create({
      title,
      avatar,
      user: pb.authStore.record.id,
    });
    return projectData;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserProjects({}) {
  try {
    const projects = await pb.collection("projects").getFullList(200, {
      filter: `user = "${pb.authStore.record.id}"`,
    });

    return projects;
  } catch (err) {
    console.error(err);
    return [];
  }
}
