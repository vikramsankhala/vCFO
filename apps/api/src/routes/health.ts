import type { FastifyInstance } from "fastify";

export function registerHealthRoutes(server: FastifyInstance) {
  server.get("/api/health", async () => {
    return { status: "ok" };
  });
}
