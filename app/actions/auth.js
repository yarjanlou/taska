"use server";

import { pb } from "@/lib/pocketbase";
import { cookies } from "next/headers";

/* ---------- Shared helpers ---------- */
function validateFields(fields) {
  const errors = {};

  if ("name" in fields && !fields.name.trim()) errors.name = "Name is required";

  if (!fields.email?.trim()) errors.email = "Email is required";

  if (!fields.password?.trim()) errors.password = "Password is required";
  else if (fields.password.length < 8)
    errors.password = "Password must be at least 8 characters";

  return errors;
}

async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set("pb_auth", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

/* ---------- Signup ---------- */
export async function signupAction(prevState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = validateFields({ name, email, password });
  if (Object.keys(errors).length) return { success: false, errors };

  try {
    await pb.collection("users").create({
      email,
      password,
      passwordConfirm: password,
      name,
    });

    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    await setAuthCookie(authData.token);

    return { success: true, user: authData.record };
  } catch (error) {
    return { success: false, errors: { general: error.message } };
  }
}

/* ---------- Login ---------- */
export async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const errors = validateFields({ email, password });
  if (Object.keys(errors).length) return { success: false, errors };

  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email, password);
    await setAuthCookie(authData.token);

    return { success: true, user: authData.record };
  } catch (error) {
    return { success: false, errors: { general: "Invalid email or password" } };
  }
}
