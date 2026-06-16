import { useAuth } from "../context/AuthContext";
import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

function Navbar() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex justify-between items-center">

      {/* Left Side */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {greeting}, {user?.name?.split(" ")[0]} 
        </h2>

        <p className="text-gray-500 mt-1">
          Welcome to PrepNyx AI Learning Dashboard
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden md:block">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search tasks, notes..."
            className="pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">

          <FaBell className="text-2xl text-gray-600 hover:text-blue-600 transition" />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            3
          </span>

        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl">

          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-lg shadow">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-gray-800">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500">
              Student
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;