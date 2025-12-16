import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { apiFetch } from "@/lib/api";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) redirect("/auth/login");

  // Only instructors should see dashboard content (students get empty state)
  const isInstructor = user.role === "INSTRUCTOR";

  let courses: any[] = [];

  if (isInstructor) {
    const cookieHeader = cookies().get("token")?.value;
    const res = await apiFetch("/api/courses/instructor", {
      headers: {
        Cookie: cookieHeader ? `token=${cookieHeader}` : "",
      },
    });
    courses = res.data;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {user.role === "INSTRUCTOR" ? "Instructor" : "Student"}
      </h1>

      {isInstructor ? (
        <>
          <h2 className="text-xl font-semibold mb-2">Your Courses</h2>

          <a
            href="/courses/create"
            className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Create Course
          </a>

          <div className="grid md:grid-cols-2 gap-4">
            {courses.length === 0 ? (
              <p className="text-gray-600">
                You haven't created any courses yet.
              </p>
            ) : (
              courses.map((course) => (
                <div
                  key={course._id}
                  className="p-4 border rounded-md bg-white shadow-sm"
                >
                  <h3 className="text-lg font-semibold">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {course.description}
                  </p>

                  <a
                    href={`/courses/${course.slug}`}
                    className="text-blue-600 text-sm mt-2 inline-block hover:underline"
                  >
                    Manage Course →
                  </a>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-700">
          Students will soon have personalized dashboards.
        </p>
      )}
    </div>
  );
}
