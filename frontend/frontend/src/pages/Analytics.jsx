import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/analyticsService";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    progress: 0,
    tasks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };

    fetchData();
  }, []);

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Learning Progress",
        data: [
          20,
          40,
          60,
          stats.progress,
        ],
        borderColor: "#2563eb",
        tension: 0.4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [
          stats.completedTasks,
          stats.pendingTasks,
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Total Tasks
          </h3>

          <p className="text-3xl font-bold">
            {stats.totalTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Completed
          </h3>

          <p className="text-3xl font-bold text-green-600">
            {stats.completedTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Pending
          </h3>

          <p className="text-3xl font-bold text-yellow-600">
            {stats.pendingTasks}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <h3 className="text-gray-500">
            Completion Rate
          </h3>

          <p className="text-3xl font-bold text-blue-600">
            {stats.progress}%
          </p>
        </div>

      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Learning Progress Trend
          </h2>

          <Line data={lineData} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4">
            Task Distribution
          </h2>

          <Doughnut data={doughnutData} />
        </div>

      </div>

      {/* Performance Summary */}
      <div className="bg-white p-6 rounded-2xl shadow mt-6">

        <h2 className="text-xl font-bold mb-4">
          Performance Summary
        </h2>

        <ul className="space-y-2">

          <li>
            📚 Total Tasks Managed:
            {" "}
            {stats.totalTasks}
          </li>

          <li>
            ✅ Tasks Completed:
            {" "}
            {stats.completedTasks}
          </li>

          <li>
            ⏳ Pending Tasks:
            {" "}
            {stats.pendingTasks}
          </li>

          <li>
            📈 Completion Rate:
            {" "}
            {stats.progress}%
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Analytics;
