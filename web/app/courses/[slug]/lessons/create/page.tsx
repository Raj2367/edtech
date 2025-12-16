import dynamic from "next/dynamic";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { createLessonAction } from "@/app/lessons/actions";

const LessonForm = dynamic(() => import("@/components/lessons/LessonForm"), {
  ssr: false,
});

export default async function CreateLessonPage({
  params,
}: {
  params: { slug: string };
}) {
  const user = await getSession();
  if (!user || user.role !== "INSTRUCTOR") redirect("/auth/login");

  const courseRes = await apiFetch(`/api/courses/${params.slug}`);
  const course = courseRes.data;
    
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Create Lesson</h1>
      <LessonForm action={createLessonAction.bind(null, course._id)} />
    </section>
  );
}
