import { registerUser,loginUser } from "../controllers/auth.controller.js";

export default async function (fastify) {
fastify.post("/register", registerUser);
  fastify.post("/login", loginUser);
}