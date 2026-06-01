import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">LMS</Link>
      <div className="space-x-6">
        {user?.role === "student" ? (
          <>
            <Link to="/student/home">Home</Link>
            <Link to="/student/courses">My Courses</Link>
            <Link to="/student/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/educator/home">Home</Link>
            <Link to="/educator/dashboard">Dashboard</Link>
            <Link to="/educator/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
