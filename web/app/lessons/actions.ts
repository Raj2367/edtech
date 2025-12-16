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
  let res = null,
    success = false;
  try {
    const token = cookies().get("token");
    if (token) {
      api.defaults.headers.common["Cookie"] = `token=${token.value}`;
    }
    res = await api.post(
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

/**
 * Update an existing lesson.
 */
export async function updateLessonAction(formData: FormData) {
  const lessonId = formData.get("lessonId") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  let res = null,
    success = false;
  try {
    const token = cookies().get("token");
    if (token) {
      api.defaults.headers.common["Cookie"] = `token=${token.value}`;
    }
    res = await api.patch(
      `/api/lessons/update/${lessonId}`,
      { title, content },
      { withCredentials: true }
    );
    success = true;
  } catch {
    return { error: "Failed to update lesson" };
  }
  if (success) redirect(`${lessonId}`);
}
