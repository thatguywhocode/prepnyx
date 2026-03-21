import Fastify from 'fastify';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const fastify = Fastify({
  logger: true,
});

fastify.register(authRoutes, { prefix: "/api/auth" });

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