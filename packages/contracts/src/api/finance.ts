export interface KpiSummaryQuery {
  companyId: string;
  from: string;
  to: string;
  scenarioId?: string;
}

export interface KpiSummaryResponse {
  revenue: number;
  ebitda: number;
  netIncome: number;
  roic: number;
  roe: number;
  wacc: number;
  netDebtToEbitda: number;
  cashConversionCycleDays: number;
}
