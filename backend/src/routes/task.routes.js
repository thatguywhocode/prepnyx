import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask
} from "../controllers/task.controller.js";

import { verifyUser } from "../plugins/auth.middleware.js";

export default async function (fastify) {
  fastify.post("/", { preHandler: verifyUser }, createTask);
  fastify.get("/", { preHandler: verifyUser }, getTasks);
  fastify.put("/:id", { preHandler: verifyUser }, updateTask);
  fastify.delete("/:id", { preHandler: verifyUser }, deleteTask);
  fastify.put("/:id/complete", { preHandler: verifyUser }, completeTask);
}