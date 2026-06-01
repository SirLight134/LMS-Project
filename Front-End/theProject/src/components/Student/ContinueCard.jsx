export default function ContinueCard({ course, progress }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
      <div className="w-full bg-gray-200 h-2 rounded mb-2">
        <div
          className="bg-blue-600 h-2 rounded"
          style={{ width: `${progress || 0}%` }}
        />
      </div>
      <a
        href={`/student/course/${course._id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        Continue ({progress || 0}% complete)
      </a>
    </div>
  );
}
