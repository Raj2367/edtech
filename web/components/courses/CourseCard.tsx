export default function CourseCard({ course }: any) {
  return (
    <a
      href={`/courses/${course.slug}`}
      className="block p-4 bg-white shadow-sm rounded-md border hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold">{course.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
    </a>
  );
}
