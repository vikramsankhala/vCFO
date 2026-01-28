import type { FastifyInstance } from "fastify";
import type { LoginRequest, LoginResponse } from "@vcfo/contracts/api";

export function registerAuthRoutes(server: FastifyInstance) {
  server.post<{ Body: LoginRequest }>("/api/auth/login", async (request) => {
    const body = request.body;

    const response: LoginResponse = {
      accessToken: `stub-access-${body.email}`,
      refreshToken: `stub-refresh-${body.email}`,
      user: {
        id: "user_stub",
        roles: ["CFO"],
      },
    };

    return response;
  });
}
