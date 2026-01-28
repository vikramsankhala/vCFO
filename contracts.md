# vCFO contracts

This file defines the canonical API and domain contracts.

## Domain entities (high-level)
- Company: id, code, name, currencyCode
- FinancialFact: id, companyId, period, accountCode, amount, currencyCode, type, scenarioId?
- Scenario: id, companyId, name
- User: id, email, roles

## API routes

### Auth
`POST /api/auth/login`

Request:
```json
{ "email": "cfo@corp.com", "password": "secret" }
```

Response:
```json
{ "accessToken": "jwt", "refreshToken": "jwt", "user": { "id": "...", "roles": ["CFO"] } }
```

### Finance core
`GET /api/finance/kpis/summary`

Query params: `companyId`, `from`, `to`, `scenarioId?`.

Response:
```json
{
  "revenue": 1234567.89,
  "ebitda": 234567.89,
  "netIncome": 123456.78,
  "roic": 0.145,
  "roe": 0.18,
  "wacc": 0.095,
  "netDebtToEbitda": 2.3,
  "cashConversionCycleDays": 42.1
}
```

### Forecasting
`POST /api/forecast/pnl`

Request:
```json
{
  "companyId": "comp_1",
  "horizonMonths": 12,
  "scenarioDrivers": {
    "revenueGrowthPct": 0.05,
    "cogsPctOfRevenue": 0.6,
    "opexGrowthPct": 0.03,
    "fxScenario": "base"
  }
}
```

### Anomalies
`GET /api/anomalies`

Query: `companyId`, `from`, `to`, `minScore`.

### Scenarios
`POST /api/scenarios`
`GET /api/scenarios/{id}/results`

### CFO Assistant
`POST /api/assistant/query`

## Non-negotiables
- JWT auth with role-based access
- Basic structured logging
- Tests for new API routes
- Consistent error format
