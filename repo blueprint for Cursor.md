

Here is a **concrete repo blueprint** you can drop into Cursor as a starting PRD / contracts file to drive a “plan → agents” build.

***

## 1. Tech stack choices

- Backend: **TypeScript**, **Node.js 20+**, **Fastify** HTTP server, **Prisma** ORM, **PostgreSQL** as primary DB.[^1][^2]
- Frontend: **Next.js 15 / React 18**, **TypeScript**, **Tailwind CSS**.[^2][^1]
- Infra: **Docker**, docker-compose for local; optional **Kubernetes** manifests later.[^3][^2]
- Auth: JWT-based auth with role-based access control (CFO, Controller, Analyst, ReadOnly).
- AI:
    - Forecasting/anomaly services written in TS first (model stubs), with ability to move to Python microservices later.
    - LLM Assistant using external API (configurable provider).

***

## 2. Monorepo layout

```text
vcfo/
  apps/
    api/                 # Fastify backend
      src/
        index.ts
        server.ts
        routes/
          health.ts
          auth/
          finance-core/
          forecasting/
          anomalies/
          scenarios/
          assistant/
        controllers/
        services/
        plugins/
        utils/
      prisma/
        schema.prisma
        migrations/
      test/
      package.json
    web/                 # Next.js frontend
      app/
        layout.tsx
        page.tsx
        dashboard/
        scenarios/
        assistant/
        settings/
      components/
      lib/
      styles/
      package.json
  packages/
    db/                  # Shared Prisma client + DB helpers
      src/
        client.ts
        repositories/
      package.json
    contracts/           # Shared types & API contracts
      src/
        api/
        finance/
        sap/
      package.json
    sap-connectors/      # SAP S/4HANA integration
      src/
        clients/
        mappers/
        jobs/
      package.json
    ai/                  # Shared AI utilities (LLM client, feature builders)
      src/
        llm/
        forecasting/
        anomalies/
      package.json
  infra/
    docker/
      api.Dockerfile
      web.Dockerfile
      docker-compose.yml
    k8s/
      api-deployment.yaml
      web-deployment.yaml
      postgres-statefulset.yaml
  .cursor/
    rules/
      global.mdc
  contracts.md
  .cursorrules
  package.json
  tsconfig.json
  README.md
```

This matches Cursor multi-agent best practices: monorepo with `apps/web`, `apps/api`, shared `packages`, and a central `contracts.md`.[^4][^5][^1][^2]

***

## 3. Core domain models (DB-level)

Define in `apps/api/prisma/schema.prisma` and share via `packages/db`:

- `Company`, `BusinessUnit`, `CostCenter`, `ProfitCenter`
- `Account` (GL), `Customer`, `Vendor`, `Currency`
- `FinancialFact` (generic fact table for P\&L/BS/CF lines)
- `CashPosition`, `ARItem`, `APItem`, `Asset`, `TreasuryPosition`
- `Scenario`, `ScenarioDriver`, `ScenarioResult`
- `Alert`, `Anomaly`, `RiskScore`
- `Project` (CapEx/M\&A), `ProjectEvaluation`
- `User`, `Role`, `UserCompanyRole`

Example snippet (high level):

```prisma
model Company {
  id            String   @id @default(cuid())
  code          String   @unique
  name          String
  currencyCode  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model FinancialFact {
  id            String   @id @default(cuid())
  companyId     String
  period        DateTime
  accountCode   String
  amount        Decimal
  currencyCode  String
  type          String   // 'PL' | 'BS' | 'CF'
  scenarioId    String?  // null for actuals
  createdAt     DateTime @default(now())
}
```


***

## 4. SAP S/4HANA integration contracts

In `packages/contracts/src/sap/` define DTOs mirroring SAP S/4HANA Finance APIs (OData GL/AR/AP).[^6][^7][^8]

Example DTOs:

```ts
// packages/contracts/src/sap/gl.ts
export interface SapGlLineItem {
  CompanyCode: string;
  FiscalYear: string;
  AccountingDocument: string;
  AccountingDocumentItem: string;
  PostingDate: string;
  AmountInCompanyCodeCurrency: string;
  CompanyCodeCurrency: string;
  GLLAccount: string;
  ProfitCenter?: string;
  CostCenter?: string;
}

// packages/contracts/src/sap/cash.ts
export interface SapCashPosition {
  CompanyCode: string;
  HouseBank: string;
  AccountId: string;
  Currency: string;
  ValueDate: string;
  Amount: string;
}
```

In `packages/sap-connectors`:

- `clients/s4hanaClient.ts`: generic OData client with base URL, auth, pagination.[^7][^6]
- `mappers/glMapper.ts`: map `SapGlLineItem` → `FinancialFact`.
- `jobs/ingestGl.ts`: scheduled job to pull new GL data (watermark-based).

***

## 5. Backend API contracts

Document in root `contracts.md` and share TS interfaces in `packages/contracts/src/api`. Cursor agents use this as a “gold file”.[^4][^1][^2]

### 5.1 Auth

```http
POST /api/auth/login
```

Request:

```json
{ "email": "cfo@corp.com", "password": "secret" }
```

Response:

```json
{ "accessToken": "jwt", "refreshToken": "jwt", "user": { "id": "...", "roles": ["CFO"] } }
```


### 5.2 Finance core

```http
GET /api/finance/kpis/summary
```

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

```http
GET /api/finance/kpis/drivers
```

Explains drivers for variance vs prior period or budget.

### 5.3 Forecasting

```http
POST /api/forecast/pnl
```

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

Response:

```json
{
  "points": [
    { "period": "2026-02-01", "revenue": 100000, "ebitda": 15000, "netIncome": 8000 },
    { "period": "2026-03-01", "revenue": 103000, "ebitda": 15450, "netIncome": 8240 }
  ],
  "confidenceBands": { "p10": [...], "p90": [...] }
}
```

```http
POST /api/forecast/cash
POST /api/forecast/working-capital
```

Similar structure, but focusing on cash, AR, AP, inventory, liquidity gaps.

### 5.4 Anomalies \& risk

```http
GET /api/anomalies
```

Query: `companyId`, `from`, `to`, `minScore`.

Response:

```json
{
  "items": [
    {
      "id": "anom_1",
      "type": "JOURNAL_ENTRY",
      "score": 0.94,
      "description": "Large manual JE at month-end outside typical range.",
      "postingDate": "2026-01-31",
      "reference": { "documentNumber": "1900001234", "companyCode": "1000" }
    }
  ]
}
```


### 5.5 Scenarios \& capital allocation

```http
POST /api/scenarios
```

Request:

```json
{
  "companyId": "comp_1",
  "name": "Capex cut 20% non-core",
  "drivers": [
    { "key": "capexNonCorePctChange", "value": -0.2 },
    { "key": "revenueGrowthPct", "value": -0.01 }
  ]
}
```

Response:

```json
{ "scenarioId": "scn_123" }
```

```http
GET /api/scenarios/{id}/results
```

Response includes P\&L/BS/CF deltas vs base and KPIs (ROIC, netDebtToEbitda, liquidity).

### 5.6 CFO Assistant (LLM)

```http
POST /api/assistant/query
```

Request:

```json
{
  "companyId": "comp_1",
  "question": "Explain drivers of Q3 margin compression in Europe.",
  "contextOptions": {
    "includeLastNMonths": 6,
    "includeBoardDecks": true
  }
}
```

Response:

```json
{
  "answer": "Margin compression in Q3 Europe was mainly driven by ...",
  "insights": [
    { "type": "driver", "label": "Mix shift", "impact": -0.8 },
    { "type": "driver", "label": "FX", "impact": -0.4 }
  ],
  "suggestedActions": [
    "Review discounting policies for product line X in EU North.",
    "Hedge at least 50% of EUR exposure for Q4."
  ]
}
```


***

## 6. Frontend structure (Next.js)

`apps/web/app` routes:

- `/dashboard` – CFO cockpit:
    - KPI cards (revenue, EBITDA, cash, ROIC, leverage).
    - Forecast charts and alerts.
- `/scenarios` – scenario builder and comparison.
- `/assistant` – chat interface for CFO Assistant.
- `/settings` – company mappings, S/4HANA config.

Use shared types from `packages/contracts` to keep FE/BE aligned.[^1][^2]

***

## 7. Cursor-specific configuration

### 7.1 `.cursorrules` (root)

Example:

```text
# Project Cursor Rules

- Use TypeScript for all application code.
- Backend: Fastify + Prisma + PostgreSQL (no raw SQL).
- Frontend: Next.js 15, React 18, TypeScript, Tailwind CSS.
- Follow the API contracts in contracts.md exactly.
- Shared types must live in packages/contracts and be reused by both apps/api and apps/web.
- Prefer functional, composable modules over large classes.
- All new routes must include basic tests in apps/api/test.
```

This follows guidance on using Cursor rules and “gold files” for consistent patterns.[^9][^5][^4][^1]

### 7.2 `contracts.md` (root)

Seed it with:

- High-level description (Virtual CFO platform on SAP S/4HANA).
- Domain entities \& fields (short list).
- API routes with request/response shapes (the ones above).
- Non-negotiables: auth, logging, tests, error format.

Cursor and its agents will treat this as the master spec for code generation and refactors.[^10][^5][^2][^4]

***

## 8. First “plan + agent” run (suggested steps)

When you open this repo in Cursor:

1. Run **Plan** on `contracts.md` and `README.md`:
    - Ask for a step-by-step implementation plan (DB → API → basic UI).
2. Ask the backend agent (scoped to `apps/api` \& `packages/db`):
    - “Create Prisma schema matching contracts.md, generate migrations, and implement the health and auth endpoints.”[^10][^3][^2]
3. Ask the frontend agent (scoped to `apps/web` \& `packages/contracts`):
    - “Create a minimal dashboard page that calls `/api/finance/kpis/summary` and renders KPI cards.”[^11][^2]

From there, you can iteratively add the SAP integration jobs, forecasting/anomaly stubs, and Assistant orchestration, always updating `contracts.md` and `.cursorrules` as the canonical spec.
<span style="display:none">[^12][^13][^14][^15]</span>

<div align="center">⁂</div>

[^1]: https://chatprd.ai/resources/PRD-for-Cursor

[^2]: https://skywork.ai/blog/vibecoding/multi-agents-full-stack-projects/

[^3]: https://forum.cursor.com/t/from-ancient-to-cutting-edge-i-modernized-a-full-stack-monorepo-with-cursor-ai/135109

[^4]: https://nmn.gl/blog/cursor-ai-gold-files

[^5]: https://www.instructa.ai/blog/cursor-ai/how-to-multiple-repository-and-large-codebase-in-cursor

[^6]: https://www.apideck.com/blog/guide-to-sap-4-hana-rest-and-soap-api

[^7]: https://www.mulesoft.com/exchange/org.mule.examples/hls-sap-accounts-payable-sys-api/minor/1.0/pages/SAP S4HANA Cloud setup guide/?no_navbar=1\&no_cookie=1\&embedded=1\&is_marketing=1

[^8]: https://doc.ibexa.co/projects/connect/en/latest/apps/sap-s4hana/

[^9]: https://github.com/digitalchild/cursor-best-practices

[^10]: https://cursor.com/blog/agent-best-practices

[^11]: https://forum.cursor.com/t/tutorial-adding-full-repo-context-pdfs-and-other-docs/33925

[^12]: https://www.builder.io/blog/cursor-tips

[^13]: https://sahaj.ai/my-journey-with-cursor-ai-more-than-just-code-completion/

[^14]: https://www.youtube.com/watch?v=mxX1TYrhPFo

[^15]: https://www.linkedin.com/posts/waqas-jamil_ai-powered-full-stack-development-with-cursor-activity-7391213648486002688--LfO

