import {
  recommend
} from "../controllers/ai.controller.js";

import {
  verifyUser
} from "../plugins/auth.middleware.js";

export default async function (
  fastify
) {
  fastify.get(
    "/recommend",
    {
      preHandler: verifyUser,
    },
    recommend
  );
}
fastify.register(aiRoutes, {
  prefix: "/api/ai",
});