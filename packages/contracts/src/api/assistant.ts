export interface AssistantQueryRequest {
  companyId: string;
  question: string;
  contextOptions?: {
    includeLastNMonths?: number;
    includeBoardDecks?: boolean;
  };
}

export interface AssistantInsight {
  type: string;
  label: string;
  impact: number;
}

export interface AssistantQueryResponse {
  answer: string;
  insights: AssistantInsight[];
  suggestedActions: string[];
}
