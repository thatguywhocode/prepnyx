import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

function StatsCard({ title, value }) {

  const getIcon = () => {
    switch (title) {
      case "Total Tasks":
        return (
          <FaTasks className="text-3xl text-blue-500" />
        );

      case "Completed":
        return (
          <FaCheckCircle className="text-3xl text-green-500" />
        );

      case "Pending":
        return (
          <FaClock className="text-3xl text-yellow-500" />
        );

      case "Progress":
        return (
          <FaChartLine className="text-3xl text-purple-500" />
        );

      default:
        return null;
    }
  };

const getCardColor = () => {
  switch (title) {
    case "Total Tasks":
      return "from-blue-500 to-blue-700";

    case "Completed":
      return "from-green-500 to-green-700";

    case "Pending":
      return "from-yellow-500 to-orange-500";

    case "Progress":
      return "from-purple-500 to-pink-500";

    default:
      return "from-gray-500 to-gray-700";
  }
};
<div
  className={`bg-gradient-to-r ${getCardColor()} text-white rounded-2xl shadow-lg p-6`}
></div>

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div>
          {getIcon()}
        </div>

      </div>

    </div>
  );
}

export default StatsCard;