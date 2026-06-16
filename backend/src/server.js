import Fastify from 'fastify';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import taskRoutes from "./routes/task.routes.js";
import progressRoutes from "./routes/progress.routes.js";
import noteRoutes from "./routes/note.routes.js";
import cors from "@fastify/cors";

dotenv.config();

const fastify = Fastify({
  logger: true,
});

await fastify.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

fastify.register(authRoutes, { prefix: "/api/auth" });
fastify.register(taskRoutes, { prefix: "/api/tasks" });
fastify.register(progressRoutes, { prefix: "/api/progress" });
fastify.register(noteRoutes, { prefix: "/api/notes" });

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the PrepNyx API!' };
});

const start = async () => {
  try {
        await connectDB();

        await fastify.listen({
      port: Number(process.env.PORT),
      host: "0.0.0.0",
    });
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();