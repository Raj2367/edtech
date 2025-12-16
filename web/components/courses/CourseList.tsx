import CourseCard from "./CourseCard";

export default function CourseList({ courses }: { courses: any[] }) {
  if (courses.length === 0) {
    return <p className="text-gray-500">No courses available.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {courses.map((c) => (
        <CourseCard key={c._id} course={c} />
      ))}
    </div>
  );
}
