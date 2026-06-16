import { useEffect, useState } from "react";
import { getRecentNotes } from "../services/noteService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import { useNavigate } from "react-router-dom";
import ProgressChart from "../components/ProgressChart";
import SubjectChart from "../components/SubjectChart";
import {
  FaPlus,
  FaBook,
  FaChartBar,
  FaRobot,
} from "react-icons/fa";
import { getDashboardStats } from "../services/analyticsService";

function Dashboard() {

const [notes, setNotes] = useState([]);
const navigate = useNavigate();

    useEffect(() => {

const fetchNotes = async () => {
  try {
    const res = await getRecentNotes();

    setNotes(
      res.data.slice(0, 5)
    );
  } catch (error) {
    console.log(error);
  }
};

fetchNotes();
    }, []);


const [stats, setStats] = useState({
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0,
  progress: 0,
  tasks: [],
  subjectCounts: {},
  recommendations: [],
});

const activities = [];

stats.tasks.forEach((task) => {
  if (task.status === "completed") {
    activities.push({
      type: "task",
      text: `Completed "${task.title}"`,
      date: task.updatedAt,
    });
  }
});

notes.forEach((note) => {
  activities.push({
    type: "note",
    text: `Added note "${note.title}"`,
    date: note.createdAt,
  });
});

activities.sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-gradient-to-br from-slate-100 to-blue-100 min-h-screen">
      <Sidebar />

      <div className="ml-64 flex-1 p-6">
        <Navbar />
{/* Quick Actions */}
<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-6">

  <button 
  onClick={() => navigate("/tasks")}
    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition"
  >
    <div className="flex items-center gap-3">
      <FaPlus className="text-2xl" />

      <div className="text-left">
        <h3 className="font-bold">
          Create Task
        </h3>

        <p className="text-sm opacity-80">
          Add a new study task
        </p>
      </div>
    </div>
  </button>

  <button
  onClick={() => navigate("/notes")}
    className="bg-gradient-to-r from-green-500 to-green-700 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition"
  >
    <div className="flex items-center gap-3">
      <FaBook className="text-2xl" />

      <div className="text-left">
        <h3 className="font-bold">
          Add Note
        </h3>

        <p className="text-sm opacity-80">
          Save study notes
        </p>
      </div>
    </div>
  </button>

  <button
  onClick={() => navigate("/analytics")}
    className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition"
  >
    <div className="flex items-center gap-3">
      <FaChartBar className="text-2xl" />

      <div className="text-left">
        <h3 className="font-bold">
          Analytics
        </h3>

        <p className="text-sm opacity-80">
          View performance
        </p>
      </div>
    </div>
  </button>

  <button
    onClick={() => {
    document
      .getElementById("ai-insights")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
    className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-5 rounded-2xl shadow-lg hover:scale-105 transition"
  >
    <div className="flex items-center gap-3">
      <FaRobot className="text-2xl" />

      <div className="text-left">
        <h3 className="font-bold">
          AI Insights
        </h3>

        <p className="text-sm opacity-80">
          Personalized suggestions
        </p>
      </div>
    </div>
  </button>

</div>
        {/* Stats Cards */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 mt-6">
          <StatsCard
            title="Total Tasks"
            value={stats.totalTasks}
          />

          <StatsCard
            title="Completed"
            value={stats.completedTasks}
          />

          <StatsCard
            title="Pending"
            value={stats.pendingTasks}
          />

          <StatsCard
            title="Progress"
            value={`${stats.progress}%`}
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mt-6">

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Progress Overview
            </h2>

            <ProgressChart />
          </div>

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Subject Progress
            </h2>
<SubjectChart
  subjectCounts={stats.subjectCounts}
/>

          </div>

        </div>

<div className="grid lg:grid-cols-2 gap-6 mt-6">

  {/* Upcoming Tasks */}
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">

    <h2 className="text-xl font-bold mb-4">
      Upcoming Tasks
    </h2>

    {stats.tasks.length === 0 ? (
      <p>No Tasks Available</p>
    ) : (
      <ul className="space-y-3">

        {stats.tasks
          .slice(0, 5)
           .filter(task => task.status === "pending")
          .map((task) => (
            <li
              key={task._id}
              className="border-b pb-2"
            >
              <div className="font-medium">
                📌 {task.title}
              </div>

              <div className="text-sm text-gray-500">
                {task.subject}
              </div>
            </li>
          ))}

      </ul>
    )}

  </div>

  {/* Recent Notes */}
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">

    <h2 className="text-xl font-bold mb-4">
      Recent Notes
    </h2>

    {notes.length === 0 ? (
      <p>No Notes Available</p>
    ) : (
      <ul className="space-y-3">

        {notes.map((note) => (
          <li
            key={note._id}
            className="border-b pb-2"
          >
            <div className="font-medium">
              📝 {note.title}
            </div>

            <div className="text-sm text-gray-500">
              {note.subject}
            </div>
          </li>
        ))}

      </ul>
    )}

  </div>

</div>
<div className="bg-white rounded-2xl shadow-lg p-6 mt-6">

  <h2 className="text-xl font-bold mb-4">
    🚨 Deadline Alerts
  </h2>

  {stats.tasks.filter(task => task.deadline).length > 0 ? (

    <div className="space-y-3">

      {stats.tasks
        .filter(task => task.deadline)
        .slice(0, 5)
        .map(task => (

          <div
            key={task._id}
            className="flex justify-between border-b pb-2"
          >
            <span>
              📌 {task.title}
            </span>

            <span className="text-red-500">
              {new Date(task.deadline)
                .toLocaleDateString()}
            </span>
          </div>

        ))}

    </div>

  ) : (

    <p>No upcoming deadlines</p>

  )}

</div>
<div
  id="ai-insights" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mt-6">

  <div className="flex justify-between items-center mb-4">

    <h2 className="text-2xl font-bold">
      🤖 AI Study Recommendations
    </h2>

    <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
      Live Insights
    </span>

  </div>

  <div className="grid md:grid-cols-2 gap-4">

    {stats.recommendations.length > 0 ? (
      stats.recommendations.map(
        (item, index) => (
          <div
            key={index}
            className="bg-white/10 p-4 rounded-xl"
          >
            ✓ {item}
          </div>
        )
      )
    ) : (
      <div className="bg-white/10 p-4 rounded-xl">
        🎉 Great work! You're on track.
      </div>
    )}

  </div>

</div>

        {/* Overall Progress */}
<div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl shadow-lg p-6 mt-6">

  <h2 className="text-xl font-bold mb-4">
    Overall Progress
  </h2>

  <div className="w-full bg-white/20 rounded-full h-4">

    <div
      className="bg-white h-4 rounded-full"
      style={{
        width: `${stats.progress}%`,
      }}
    ></div>

  </div>

  <p className="mt-3 font-semibold">
    {stats.progress}% Completed
  </p>

</div>
       <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg mt-6">

  <h2 className="text-xl font-bold mb-4">
    Recent Activity
  </h2>

  {activities.length > 0 ? (

    <div className="space-y-3">

      {activities.slice(0, 5).map(
        (activity, index) => (

          <div
            key={index}
            className="flex justify-between border-b pb-2"
          >
            <span>
              {activity.type === "task"
                ? "✅"
                : "📝"}{" "}
              {activity.text}
            </span>

            <span className="text-gray-400 text-sm">
              {new Date(
                activity.date
              ).toLocaleDateString()}
            </span>
          </div>

        )
      )}

    </div>

  ) : (

    <p>No recent activity.</p>

  )}

</div>

      </div>
    </div>
  );
}

export default Dashboard;