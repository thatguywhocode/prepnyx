import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaHome,
  FaTasks,
  FaStickyNote,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaRobot,
} from "react-icons/fa";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: <FaTasks />,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: <FaStickyNote />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartBar />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-white fixed flex flex-col justify-between">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold">
            📚 PrepNyx
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            AI Learning Platform
          </p>
        </div>


        {/* Navigation */}
        <nav className="mt-6 px-4 flex flex-col gap-2">

          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-700">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition p-3 rounded-xl"
        >
          <FaSignOutAlt />
          Logout
        </button>

        <p className="text-center text-xs text-slate-500 mt-4">
          PrepNyx v1.0
        </p>

      </div>

    </div>
  );
}

export default Sidebar;