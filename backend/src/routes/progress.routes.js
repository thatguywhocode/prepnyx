import {
  getProgress,
  getSubjectAnalytics
} from "../controllers/progress.controller.js";

import { verifyUser } from "../plugins/auth.middleware.js";

export default async function (fastify) {
  fastify.get("/", { preHandler: verifyUser }, getProgress);
  fastify.get("/subjects", { preHandler: verifyUser }, getSubjectAnalytics);
}