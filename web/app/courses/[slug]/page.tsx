import { apiFetch } from "@/lib/api";
import dynamic from "next/dynamic";
import { getSession } from "@/lib/session";
import { updateCourseAction } from "../actions";

const CourseForm = dynamic(() => import("@/components/courses/CourseForm"), {
  ssr: false,
});

export default async function CourseViewPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSession();

  const res = await apiFetch(`/api/courses/${params.slug}`);
  const course = res.data;

  const isInstructor = user?.userId === course.instructorId;
  let lessons = [];
  if (!isInstructor) {
    const lessonsRes = await apiFetch(`/api/lessons/${course._id}`);
    lessons = lessonsRes.data;
  }

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <p className="mb-4 text-gray-500">{course.description}</p>

      {isInstructor ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Edit Course</h2>
          <CourseForm
            action={updateCourseAction}
            defaultValues={{
              title: course.title,
              description: course.description,
              courseId: course._id,
            }}
          />

          <a
            href={`/courses/${course.slug}/lessons`}
            className="inline-block mt-6 text-blue-600 hover:underline"
          >
            Manage Lessons →
          </a>
        </>
      ) : (
        <ul className="space-y-3">
          {lessons.map((lesson: any, idx: number) => (
            <li
              key={lesson._id}
              className="p-4 bg-white border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <span>
                Lesson {idx + 1} - {lesson.title}
              </span>
              <div className="mt-4 text-gray-400">{lesson.content}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
