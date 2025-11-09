import { pb } from "../pocketbase";

export async function createProject({ title }) {
  try {
    const projectData = await pb.collection("projects").create({
      title,
      user: pb.authStore.record.id,
    });
    return projectData;
  } catch (err) {
    console.error(err);
  }
}

async function getProjects({}) {}
