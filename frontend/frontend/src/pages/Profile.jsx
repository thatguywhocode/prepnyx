import { useAuth } from "../context/AuthContext";
import {
  FaUserGraduate,
  FaTasks,
  FaStickyNote,
  FaChartLine,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { getNotes } from "../services/noteService";
import { getDashboardStats } from "../services/analyticsService";
 
function Profile() {
    const { user } = useAuth();
    
const [stats, setStats] = useState({
  completedTasks: 0,
  totalNotes: 0,
  progress: 0,
});

useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const taskRes = await getTasks();
      const noteRes = await getNotes();
      const dashboardStats =
        await getDashboardStats();

      const completedTasks =
        taskRes.data.filter(
          (task) =>
            task.status === "completed"
        ).length;

      setStats({
        completedTasks,
        totalNotes: noteRes.data.length,
        progress:
          dashboardStats.progress,
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchProfileData();
}, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          👤 My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your PrepNyx account and track your learning journey.
        </p>
      </div>

      {/* Profile Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-lg p-8 text-white">

        <div className="flex items-center gap-6">

          <div className="w-28 h-28 rounded-full bg-white text-blue-600 flex items-center justify-center text-5xl font-bold shadow-lg">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div>
            <h2 className="text-4xl font-bold">
              {user?.name}
            </h2>

            <p className="text-lg opacity-90 mt-2">
              {user?.email}
            </p>

            <span className="inline-block mt-3 bg-white/20 px-4 py-1 rounded-full text-sm">
              🎓 PrepNyx Learner
            </span>
          </div>

        </div>

      </div>

      {/* Learning Stats */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaTasks className="text-3xl text-blue-600 mb-3" />

          <h3 className="text-gray-500">
            Tasks Completed
          </h3>

         <p className="text-3xl font-bold">
  {stats.completedTasks}
</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaStickyNote className="text-3xl text-green-600 mb-3" />

          <h3 className="text-gray-500">
            Notes Created
          </h3>

         <p className="text-3xl font-bold">
  {stats.totalNotes}
</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <FaChartLine className="text-3xl text-purple-600 mb-3" />

          <h3 className="text-gray-500">
            Learning Progress
          </h3>

          <p className="text-3xl font-bold">
  {stats.progress}%
</p>
        </div>
        <div className="mt-3">
  <div className="w-full bg-gray-200 rounded-full h-2">

    <div
      className="bg-purple-600 h-2 rounded-full"
      style={{
        width: `${stats.progress}%`,
      }}
    ></div>

  </div>
</div>

      </div>

      {/* Account Details */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Account Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="text-gray-500 mb-2">
              Full Name
            </h3>

            <p className="font-semibold text-lg">
              {user?.name}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="text-gray-500 mb-2">
              Email Address
            </h3>

            <p className="font-semibold text-lg">
              {user?.email}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="text-gray-500 mb-2">
              Account Type
            </h3>

            <p className="font-semibold text-lg">
              Student
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl">
            <h3 className="text-gray-500 mb-2">
              Platform
            </h3>

            <p className="font-semibold text-lg">
              PrepNyx AI Learning
            </p>
            
          </div>
<div className="bg-slate-50 p-5 rounded-xl">
  <h3 className="text-gray-500 mb-2">
    Member Since
  </h3>

  <p className="font-semibold text-lg">
    2026
  </p>
</div>
        </div>

      </div>

      {/* Achievement Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

        <div className="flex items-center gap-4">

          <FaUserGraduate className="text-5xl text-yellow-500" />

          <div>
            <h2 className="text-2xl font-bold">
              Learning Achievement
            </h2>

            <p className="text-gray-500">
            {stats.progress >= 75
  ? "🏆 Excellent progress! You're among the top learners."
  : stats.progress >= 40
  ? "🚀 Great work! Keep completing tasks regularly."
  : "📚 Complete more tasks and notes to improve your learning score."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;