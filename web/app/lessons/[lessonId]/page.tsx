import dynamic from "next/dynamic";
import { apiFetch } from "@/lib/api";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { updateLessonAction } from "@/app/lessons/actions";
import { cookies } from "next/headers";

const LessonForm = dynamic(() => import("@/components/lessons/LessonForm"), {
  ssr: false,
});

export default async function EditLessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const user = await getSession();
  if (!user || user.role !== "INSTRUCTOR") redirect("/auth/login");

  const cookieHeader = cookies().get("token")?.value;
  const lessonRes = await apiFetch(`/api/lessons/single/${params.lessonId}`,{
    headers: {
      Cookie: cookieHeader ? `token=${cookieHeader}` : "",
    }
  });
  const lesson = lessonRes.data;
  
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Edit Lesson</h1>
      <LessonForm
        action={updateLessonAction}
        defaultValues={{
          title: lesson.title,
          content: lesson.content,
          lessonId: lesson._id,
        }}
      />
    </section>
  );
}
