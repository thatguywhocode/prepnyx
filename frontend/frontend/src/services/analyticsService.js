import { getTasks } from "./taskService";

export const getDashboardStats = async () => {
  const res = await getTasks();

  const tasks = res.data;

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const progress =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  const subjectCounts = {};

  tasks.forEach((task) => {
    if (task.subject) {
      subjectCounts[task.subject] =
        (subjectCounts[task.subject] || 0) + 1;
    }
  });

  const recommendations = [];

  if (pendingTasks > 0) {
    recommendations.push(
      `Complete ${pendingTasks} pending task(s)`
    );
  }

  if (completedTasks < totalTasks / 2) {
    recommendations.push(
      "Focus on improving task completion rate"
    );
  }

  if (Object.keys(subjectCounts).length > 0) {
    const weakestSubject =
      Object.keys(subjectCounts).sort(
        (a, b) =>
          subjectCounts[a] - subjectCounts[b]
      )[0];

    recommendations.push(
      `Spend more time on ${weakestSubject}`
    );
  }

  if (tasks.length < 5) {
    recommendations.push(
      "Create more study tasks for better planning"
    );
  }

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    progress,
    tasks,
    subjectCounts,
    recommendations,
  };
};

