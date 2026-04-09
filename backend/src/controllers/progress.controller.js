import mongoose from "mongoose";
import Task from "../models/task.model.js";


// 🔹 Overall Progress
export const getProgress = async (req, reply) => {
  try {
    const userId = req.user.id;

    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({
      userId,
      status: "completed"
    });

    const progress = totalTasks === 0
      ? 0
      : (completedTasks / totalTasks) * 100;

    return reply.send({
      totalTasks,
      completedTasks,
      progress: progress.toFixed(2)
    });

  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Progress by Subject
export const getSubjectAnalytics = async (req, reply) => {
  try {
    const userId = req.user.id;

    const data = await Task.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },
      {
        $group: {
          _id: "$subject",
          total: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
            }
          }
        }
      }
    ]);

    return reply.send(data);

  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};