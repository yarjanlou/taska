import { pb } from "../pocketbase";

export async function signup({ email, password, name }) {
  try {
    const authData = await pb.collection("users").create({
      email,
      name,
      password,
      passwordConfirm: password,
    });
    await pb.collection("users").authWithPassword(email, password);
  } catch (err) {
    throw new Error(err.data);
  }
}

export async function login({ email, password }) {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}
