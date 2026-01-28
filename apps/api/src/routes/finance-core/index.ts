import type { FastifyInstance } from "fastify";
import { registerKpiSummaryRoute } from "./kpisSummary";

export function registerFinanceRoutes(server: FastifyInstance) {
  registerKpiSummaryRoute(server);
}
