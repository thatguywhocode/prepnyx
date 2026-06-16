import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SubjectChart({ subjectCounts }) {
  const labels = Object.keys(subjectCounts);

  const values = Object.values(subjectCounts);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#3B82F6", // Blue
          "#10B981", // Green
          "#F59E0B", // Yellow
          "#EF4444", // Red
          "#8B5CF6", // Purple
          "#06B6D4", // Cyan
          "#EC4899", // Pink
          "#84CC16", // Lime
        ],
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 20,

          font: {
            size: 14,
          },

          color: "#374151",
        },
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} task(s)`;
          },
        },
      },
    },
  };

  return (
    <div className="h-[250px] w-full flex items-center justify-center">
      {labels.length > 0 ? (
        <Doughnut
          data={data}
          options={options}
        />
      ) : (
        <p className="text-center text-gray-500">
          No Subject Data Available
        </p>
      )}
    </div>
  );
}

export default SubjectChart;

