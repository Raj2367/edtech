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

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <p className="mb-4 text-gray-700">{course.description}</p>

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
        <p className="text-gray-500">This is a course by an instructor.</p>
      )}
    </section>
  );
}
