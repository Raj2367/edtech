"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "@/lib/api";

/**
 * Register Action
 */
export async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let success = false;
  try {
    const res = await api.post(
      "/api/auth/register",
      { name, email, password },
      { withCredentials: true }
    );

    const cookie = res.headers["set-cookie"]?.[0];
    if (cookie) {
      cookies().set("token", cookie.split(";")[0].replace("token=", ""), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
    }
    success = true;
  } catch (err: any) {
    console.log(
      `{ error: Registration failed: ${err?.response?.data?.message} }`
    );
    return;
  }

  if (success) redirect("/dashboard");
}

/**
 * Login Action
 * Executes on the server to securely send credentials
 * to the Render backend, which sets an HttpOnly cookie.
 */
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let success = false;
  try {
    const res = await api.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );

    const cookie = res.headers["set-cookie"]?.[0];
    if (cookie) {
      cookies().set("token", cookie.split(";")[0].replace("token=", ""), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });
    }
    success = true;
  } catch (err: any) {
    console.log("{ error: Invalid email or password }");
    return;
  }
  if (success) redirect("/dashboard");
}
