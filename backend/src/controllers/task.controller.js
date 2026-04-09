import Task from "../models/task.model.js";

// 🔹 Create Task
export const createTask = async (req, reply) => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.user.id
    });

    return reply.code(201).send(task);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Get All Tasks (for logged-in user)
export const getTasks = async (req, reply) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });

    return reply.send(tasks);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Update Task
export const updateTask = async (req, reply) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return reply.send(task);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

// 🔹 Delete Task
export const deleteTask = async (req, reply) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    return reply.send({ message: "Task deleted" });
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};

export const completeTask = async (req, reply) => {
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id   
      },
      { status: "completed" },
      { new: true }
    );

    if (!task) {
      return reply.code(404).send({ message: "Task not found" });
    }

    return reply.send(task);
  } catch (error) {
    return reply.code(500).send({ message: error.message });
  }
};