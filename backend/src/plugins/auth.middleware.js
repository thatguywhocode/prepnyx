import jwt from "jsonwebtoken";

export const verifyUser = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decoded; // attach user data

  } catch (error) {
    return reply.code(401).send({ message: "Invalid or expired token" });
  }
};