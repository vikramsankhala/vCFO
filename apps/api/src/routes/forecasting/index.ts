import type { FastifyInstance } from "fastify";
import type {
  ForecastPnlRequest,
  ForecastPnlResponse,
  ForecastCashRequest,
  ForecastCashResponse,
  ForecastWorkingCapitalRequest,
  ForecastWorkingCapitalResponse,
} from "@vcfo/contracts/api";

const addMonths = (date: Date, months: number) => {
  const copy = new Date(date);
  copy.setMonth(copy.getMonth() + months);
  return copy;
};

export function registerForecastRoutes(server: FastifyInstance) {
  server.post<{ Body: ForecastPnlRequest }>("/api/forecast/pnl", async (request) => {
    const { horizonMonths, scenarioDrivers } = request.body;
    const baseRevenue = 100000;
    const points = Array.from({ length: horizonMonths }, (_, idx) => {
      const period = addMonths(new Date(), idx);
      const revenue = baseRevenue * Math.pow(1 + scenarioDrivers.revenueGrowthPct, idx);
      const cogs = revenue * scenarioDrivers.cogsPctOfRevenue;
      const opex = revenue * scenarioDrivers.opexGrowthPct;
      const ebitda = revenue - cogs - opex;
      const netIncome = ebitda * 0.6;

      return {
        period: period.toISOString().slice(0, 10),
        revenue: Number(revenue.toFixed(2)),
        ebitda: Number(ebitda.toFixed(2)),
        netIncome: Number(netIncome.toFixed(2)),
      };
    });

    const response: ForecastPnlResponse = {
      points,
      confidenceBands: {
        p10: points.map((point) => ({
          ...point,
          revenue: Number((point.revenue * 0.9).toFixed(2)),
          ebitda: Number((point.ebitda * 0.9).toFixed(2)),
          netIncome: Number((point.netIncome * 0.9).toFixed(2)),
        })),
        p90: points.map((point) => ({
          ...point,
          revenue: Number((point.revenue * 1.1).toFixed(2)),
          ebitda: Number((point.ebitda * 1.1).toFixed(2)),
          netIncome: Number((point.netIncome * 1.1).toFixed(2)),
        })),
      },
    };

    return response;
  });

  server.post<{ Body: ForecastCashRequest }>("/api/forecast/cash", async (request) => {
    const { horizonMonths } = request.body;
    const points = Array.from({ length: horizonMonths }, (_, idx) => {
      const period = addMonths(new Date(), idx);
      return { period: period.toISOString().slice(0, 10), value: 50000 + idx * 500 };
    });

    const response: ForecastCashResponse = { points };
    return response;
  });

  server.post<{ Body: ForecastWorkingCapitalRequest }>(
    "/api/forecast/working-capital",
    async (request) => {
      const { horizonMonths } = request.body;
      const points = Array.from({ length: horizonMonths }, (_, idx) => {
        const period = addMonths(new Date(), idx);
        return { period: period.toISOString().slice(0, 10), value: 20000 + idx * 250 };
      });

      const response: ForecastWorkingCapitalResponse = { points };
      return response;
    }
  );
}
