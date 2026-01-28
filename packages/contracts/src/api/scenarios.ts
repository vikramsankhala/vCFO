export interface ScenarioDriverInput {
  key: string;
  value: number;
}

export interface ScenarioCreateRequest {
  companyId: string;
  name: string;
  drivers: ScenarioDriverInput[];
}

export interface ScenarioCreateResponse {
  scenarioId: string;
}

export interface ScenarioResultResponse {
  scenarioId: string;
  summary: Record<string, number>;
}
