"use server";

import { cookies } from "next/headers";
import { apiFetch } from "./api";

/**
 * Retrieves the logged-in user from backend using cookie-based auth.
 * Called from Server Components only.
 */
export async function getSession() {
  try {
    const cookieHeader = cookies().get("token")?.value;

    const res = await apiFetch("/api/auth/me", {
      headers: {
        Cookie: cookieHeader ? `token=${cookieHeader}` : "",
      },
    });

    return res.data.user;
  } catch {
    return null;
  }
}
