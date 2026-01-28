export interface ForecastPnlRequest {
  companyId: string;
  horizonMonths: number;
  scenarioDrivers: {
    revenueGrowthPct: number;
    cogsPctOfRevenue: number;
    opexGrowthPct: number;
    fxScenario: string;
  };
}

export interface ForecastPnlPoint {
  period: string;
  revenue: number;
  ebitda: number;
  netIncome: number;
}

export interface ForecastPnlResponse {
  points: ForecastPnlPoint[];
  confidenceBands: {
    p10: ForecastPnlPoint[];
    p90: ForecastPnlPoint[];
  };
}

export interface ForecastCashRequest {
  companyId: string;
  horizonMonths: number;
}

export interface ForecastCashPoint {
  period: string;
  value: number;
}

export interface ForecastCashResponse {
  points: ForecastCashPoint[];
}

export interface ForecastWorkingCapitalRequest {
  companyId: string;
  horizonMonths: number;
}

export interface ForecastWorkingCapitalPoint {
  period: string;
  value: number;
}

export interface ForecastWorkingCapitalResponse {
  points: ForecastWorkingCapitalPoint[];
}
