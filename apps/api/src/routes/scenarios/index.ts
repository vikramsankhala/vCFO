import type { FastifyInstance } from "fastify";
import type {
  ScenarioCreateRequest,
  ScenarioCreateResponse,
  ScenarioResultResponse,
} from "@vcfo/contracts/api";

const randomId = () => `scn_${Math.random().toString(36).slice(2, 10)}`;

export function registerScenarioRoutes(server: FastifyInstance) {
  server.post<{ Body: ScenarioCreateRequest }>(
    "/api/scenarios",
    async (): Promise<ScenarioCreateResponse> => {
      return { scenarioId: randomId() };
    }
  );

  server.get<{ Params: { id: string } }>(
    "/api/scenarios/:id/results",
    async (request): Promise<ScenarioResultResponse> => {
      return { scenarioId: request.params.id, summary: {} };
    }
  );
}
