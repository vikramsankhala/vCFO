import type { FastifyInstance } from "fastify";
import type { KpiSummaryQuery, KpiSummaryResponse } from "@vcfo/contracts/api";
import { prisma } from "../../db/client";

const toNumber = (value: unknown) => {
  if (value == null) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "object" && "toNumber" in value) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
};

const sumByPrefix = (rows: { accountCode: string; amount: unknown }[], prefix: string) => {
  const match = prefix.toUpperCase();
  return rows.reduce((total, row) => {
    if (row.accountCode.toUpperCase().startsWith(match)) {
      return total + toNumber(row.amount);
    }
    return total;
  }, 0);
};

export function registerKpiSummaryRoute(server: FastifyInstance) {
  server.get<{ Querystring: KpiSummaryQuery }>(
    "/api/finance/kpis/summary",
    async (request, reply): Promise<KpiSummaryResponse> => {
      const { companyId, from, to, scenarioId } = request.query;

      if (!companyId || !from || !to) {
        reply.code(400);
        return {
          revenue: 0,
          ebitda: 0,
          netIncome: 0,
          roic: 0,
          roe: 0,
          wacc: 0,
          netDebtToEbitda: 0,
          cashConversionCycleDays: 0,
        };
      }

      const fromDate = new Date(from);
      const toDate = new Date(to);

      if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
        reply.code(400);
        return {
          revenue: 0,
          ebitda: 0,
          netIncome: 0,
          roic: 0,
          roe: 0,
          wacc: 0,
          netDebtToEbitda: 0,
          cashConversionCycleDays: 0,
        };
      }

      const company = await prisma.company.findFirst({
        where: {
          OR: [{ id: companyId }, { code: companyId }],
        },
        select: { id: true },
      });

      if (!company) {
        reply.code(404);
        return {
          revenue: 0,
          ebitda: 0,
          netIncome: 0,
          roic: 0,
          roe: 0,
          wacc: 0,
          netDebtToEbitda: 0,
          cashConversionCycleDays: 0,
        };
      }

      const facts = await prisma.financialFact.findMany({
        where: {
          companyId: company.id,
          period: { gte: fromDate, lte: toDate },
          ...(scenarioId ? { scenarioId } : {}),
        },
        select: {
          accountCode: true,
          amount: true,
        },
      });

      // Account code conventions (seed data uses these prefixes):
      // REV, COGS, OPEX, DEP, INT, TAX, ASSET, EQUITY, DEBT, CASH, AR, AP, INV
      const revenue = sumByPrefix(facts, "REV");
      const cogs = sumByPrefix(facts, "COGS");
      const opex = sumByPrefix(facts, "OPEX");
      const depreciation = sumByPrefix(facts, "DEP");
      const interest = sumByPrefix(facts, "INT");
      const tax = sumByPrefix(facts, "TAX");

      const ebitda = revenue - cogs - opex;
      const netIncome = ebitda - depreciation - interest - tax;

      const debt = sumByPrefix(facts, "DEBT");
      const cash = sumByPrefix(facts, "CASH");
      const equity = sumByPrefix(facts, "EQUITY");
      const capital = sumByPrefix(facts, "CAPITAL") + sumByPrefix(facts, "ASSET");
      const netDebt = debt - cash;

      const roic = capital !== 0 ? netIncome / capital : 0;
      const roe = equity !== 0 ? netIncome / equity : 0;
      const netDebtToEbitda = ebitda !== 0 ? netDebt / ebitda : 0;

      const accountsReceivable = sumByPrefix(facts, "AR");
      const accountsPayable = sumByPrefix(facts, "AP");
      const inventory = sumByPrefix(facts, "INV");
      const dso = revenue !== 0 ? (accountsReceivable / revenue) * 365 : 0;
      const dpo = cogs !== 0 ? (accountsPayable / cogs) * 365 : 0;
      const dio = cogs !== 0 ? (inventory / cogs) * 365 : 0;
      const cashConversionCycleDays = dso + dio - dpo;

      return {
        revenue,
        ebitda,
        netIncome,
        roic,
        roe,
        wacc: 0,
        netDebtToEbitda,
        cashConversionCycleDays,
      };
    }
  );
}
