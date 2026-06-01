export default function ProgressCard({ label, value, unit }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow text-center">
      <p className="text-2xl font-bold text-blue-600">
        {value}
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </p>
      <p className="text-gray-600 text-sm mt-1">{label}</p>
    </div>
  );
}
