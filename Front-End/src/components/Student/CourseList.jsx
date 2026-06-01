import CourseCard from "./CourseCard";

export default function CourseList({ courses }) {
  if (!courses || courses.length === 0) {
    return <div className="text-gray-500">No courses available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
}
