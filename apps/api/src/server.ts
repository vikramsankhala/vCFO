import Fastify from "fastify";
import { registerHealthRoutes } from "./routes/health";
import { registerFinanceRoutes } from "./routes/finance-core";
import { registerAuthRoutes } from "./routes/auth";
import { registerForecastRoutes } from "./routes/forecasting";
import { registerAnomalyRoutes } from "./routes/anomalies";
import { registerScenarioRoutes } from "./routes/scenarios";
import { registerAssistantRoutes } from "./routes/assistant";

export function buildServer() {
  const server = Fastify({ logger: true });

  registerHealthRoutes(server);
  registerFinanceRoutes(server);
  registerAuthRoutes(server);
  registerForecastRoutes(server);
  registerAnomalyRoutes(server);
  registerScenarioRoutes(server);
  registerAssistantRoutes(server);

  return server;
}
