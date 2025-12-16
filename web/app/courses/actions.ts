"use server";

import { redirect } from "next/navigation";
import { api } from "@/lib/api";
import { cookies } from "next/headers";

/**
 * Create a new course (Instructor only).
 */
export async function createCourseAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  let res = null,
    success = false;
  try {
    const token = cookies().get("token");
    if (token) {
      api.defaults.headers.common["Cookie"] = `token=${token.value}`;
    }
    res = await api.post(
      "/api/courses",
      { title, description },
      { withCredentials: true }
    );
    success = true;
  } catch (err: any) {
    return { error: err?.response?.data?.message || "Failed to create course" };
  }

  if (success) {
    const slug = res.data.data.slug;
    redirect(`/courses/${slug}`);
  }
}

/**
 * Update existing course
 */
export async function updateCourseAction(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const courseId = formData.get("courseId") as string;
  let res = null,
    success = false;
  try {
    const token = cookies().get("token");
    if (token) {
      api.defaults.headers.common["Cookie"] = `token=${token.value}`;
    }
    res = await api.patch(
      `/api/courses/edit/${courseId}`,
      { title, description },
      { withCredentials: true }
    );
    success = true;
  } catch (err: any) {
    return { error: "Failed to update course." };
  }
  if (success) {
    const slug = res.data.data.slug;
    redirect(`/courses/${slug}`);
  }
}
