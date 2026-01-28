export interface AnomaliesQuery {
  companyId: string;
  from: string;
  to: string;
  minScore?: number;
}

export interface AnomalyItem {
  id: string;
  type: string;
  score: number;
  description: string;
  postingDate: string;
  reference?: {
    documentNumber?: string;
    companyCode?: string;
  };
}

export interface AnomaliesResponse {
  items: AnomalyItem[];
}
