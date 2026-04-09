import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String
    },
    deadline: {
      type: Date
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending"
    }
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;