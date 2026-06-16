import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  completeTask,
} from "../services/taskService";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    deadline: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await createTask(formData);

      setFormData({
        title: "",
        subject: "",
        deadline: "",
      });

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await completeTask(id);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Task Management
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">Total Tasks</h3>
          <p className="text-3xl font-bold">
            {tasks.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {completedTasks}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h3 className="text-gray-500">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {pendingTasks}
          </p>
        </div>
      </div>

      {/* Create Task */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Create New Task
        </h2>

        <form
          onSubmit={handleCreateTask}
          className="grid md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg md:col-span-3"
          >
            Create Task
          </button>
        </form>
      </div>

      {/* Task List */}
      <div className="grid gap-4">

        {tasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            No Tasks Found
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow p-5"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h3 className="text-xl font-bold">
                    {task.title}
                  </h3>

                  <p className="text-gray-500">
                    Subject: {task.subject || "N/A"}
                  </p>

                  <p className="text-sm text-gray-400">
                    Deadline:{" "}
                    {task.deadline
                      ? new Date(
                          task.deadline
                        ).toLocaleDateString()
                      : "Not Set"}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-3 mt-4">

                {task.status !== "completed" && (
                  <button
                    onClick={() =>
                      handleComplete(task._id)
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Complete
                  </button>
                )}

                <button
                  onClick={() =>
                    handleDelete(task._id)
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default Tasks;

