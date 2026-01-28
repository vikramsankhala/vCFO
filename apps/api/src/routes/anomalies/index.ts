import type { FastifyInstance } from "fastify";
import type { AnomaliesQuery, AnomaliesResponse } from "@vcfo/contracts/api";

export function registerAnomalyRoutes(server: FastifyInstance) {
  server.get<{ Querystring: AnomaliesQuery }>("/api/anomalies", async () => {
    const response: AnomaliesResponse = { items: [] };
    return response;
  });
}
