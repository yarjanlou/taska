"use server";

import { pb } from "@/lib/pocketbase";
import { cookies } from "next/headers";

export async function signupAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");

  // validation
  const errors = {};
  if (!name.trim()) errors.name = "Name is required";
  if (!email.trim()) errors.email = "Email is required";
  if (!password.trim()) errors.password = "Password is required";
  else if (password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (Object.keys(errors).length !== 0) return { success: false, errors };

  try {
    const record = await pb.collection("users").create({
      email,
      password,
      passwordConfirm: password,
      name,
    });

    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);

    const cookieStore = await cookies();
    cookieStore.set("pb_auth", authData.token, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return { success: true, user: authData.record, errors: null };
  } catch (error) {
    return { success: false, errors: {}, message: error.message };
  }
}
