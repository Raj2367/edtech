import { apiFetch } from "@/lib/api";
import CourseList from "@/components/courses/CourseList";

export const revalidate = 60; // ISR caching: refresh every 60 seconds

export default async function CoursesPage() {
  const res = await apiFetch("/api/courses");
  const courses = res.data;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Published Courses</h1>
      <CourseList courses={courses} />
    </section>
  );
}
