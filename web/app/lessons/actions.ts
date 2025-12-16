"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

/**
 * Create a new lesson under a course.
 */
export async function createLessonAction(courseId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  let success = false;
  try {
    const token = cookies().get("token");
    if (token) {
      api.defaults.headers.common["Cookie"] = `token=${token.value}`;
    }
    await api.post(
      `/api/lessons/${courseId}`,
      { title, content },
      { withCredentials: true }
    );
    success = true;
  } catch (err: any) {
    return { error: "Failed to create lesson" };
  }
  if (success) redirect("lessons");
}
