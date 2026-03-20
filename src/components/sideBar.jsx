import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <aside className="fixed top-16 w-64 left-0 h-[calc(100vh-4rem)] bg-gray-100 border-r border-gray-200 flex flex-col justify-between">
        <div className="flex-1 overflow-y-auto">
          <nav className="mt-6 px-4 space-y-2">
            <Link to="/patients" className="bg-gray-100 text-blue-600">
              Patients
            </Link>
            <br />
            <Link to="/encounters" className="bg-gray-100 text-blue-600">
              Encounters
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </aside>

    </>
  );
}
