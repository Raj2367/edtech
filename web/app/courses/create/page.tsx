import dynamic from "next/dynamic";
import { createCourseAction } from "../actions";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const CourseForm = dynamic(() => import("@/components/courses/CourseForm"), {
  ssr: false,
});

export default async function CreateCoursePage() {
  const user = await getSession();
  if (!user || user.role !== "INSTRUCTOR") redirect("/auth/login");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
      <CourseForm action={createCourseAction} />
    </div>
  );
}
