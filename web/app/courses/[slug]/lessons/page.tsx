import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LessonListPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSession();
  if (!user || user.role !== "INSTRUCTOR") redirect("/auth/login");

  const courseRes = await apiFetch(`/api/courses/${params.slug}`);
  const course = courseRes.data;

  const lessonsRes = await apiFetch(`/api/lessons/${course._id}`);
  const lessons = lessonsRes.data;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Lessons – {course.title}</h1>

      <a
        href={`/courses/${params.slug}/lessons/create`}
        className="inline-block mb-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Lesson
      </a>

      {lessons.length === 0 ? (
        <p className="text-gray-500">No lessons created yet.</p>
      ) : (
        <ul className="space-y-3">
          {lessons.map((lesson: any) => (
            <li
              key={lesson._id}
              className="p-4 bg-white border rounded flex justify-between"
            >
              <span>{lesson.title}</span>
              <a
                href={`/lessons/${lesson._id}`}
                className="text-blue-600 hover:underline"
              >
                Edit →
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
