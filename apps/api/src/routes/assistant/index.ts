import type { FastifyInstance } from "fastify";
import type { AssistantQueryRequest, AssistantQueryResponse } from "@vcfo/contracts/api";

export function registerAssistantRoutes(server: FastifyInstance) {
  server.post<{ Body: AssistantQueryRequest }>(
    "/api/assistant/query",
    async (request): Promise<AssistantQueryResponse> => {
      return {
        answer: `Stubbed response for: ${request.body.question}`,
        insights: [],
        suggestedActions: [],
      };
    }
  );
}
