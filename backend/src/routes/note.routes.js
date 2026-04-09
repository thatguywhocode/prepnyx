import {
  createNote,
  getNotes,
  updateNote,
  deleteNote
} from "../controllers/note.controller.js";

import { verifyUser } from "../plugins/auth.middleware.js";

export default async function (fastify) {
  fastify.post("/", { preHandler: verifyUser }, createNote);
  fastify.get("/", { preHandler: verifyUser }, getNotes);
  fastify.put("/:id", { preHandler: verifyUser }, updateNote);
  fastify.delete("/:id", { preHandler: verifyUser }, deleteNote);
}