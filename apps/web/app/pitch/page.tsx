const sections = [
  {
    title: "Problem",
    body:
      "Mid-market CFOs lose weeks to manual reporting, fragmented systems, and reactive cash management. The data exists in ERP, but decisions lag behind reality.",
  },
  {
    title: "Solution",
    body:
      "vCFO is an AI-assisted finance cockpit that unifies SAP S/4HANA data, automates KPI reporting, and provides scenario planning and anomaly detection in one place.",
  },
  {
    title: "Product",
    body:
      "Real-time KPI summaries, cash and P&L forecasting, and a CFO assistant that explains variance drivers and recommends actions. Built on a secure, auditable data model.",
  },
  {
    title: "Market",
    body:
      "Global mid-market enterprises and PE-backed portfolio companies with complex finance operations. Initial focus on SAP S/4HANA users who lack modern analytics layers.",
  },
  {
    title: "Business Model",
    body:
      "SaaS subscription priced per company and user role, with usage-based add-ons for forecasting and AI assistant calls.",
  },
  {
    title: "Go-to-Market",
    body:
      "Land via finance transformation teams and SAP integrators. Expand across portfolio companies through CFO networks and PE operating partners.",
  },
  {
    title: "Traction (POC)",
    body:
      "Working prototype with KPI aggregation, scenario inputs, and assistant stubs. Ready for pilot integrations and data ingestion validation.",
  },
  {
    title: "Roadmap",
    body:
      "Phase 1: SAP ingestion + KPI automation. Phase 2: forecasting and anomaly detection. Phase 3: multi-entity planning and treasury optimization.",
  },
  {
    title: "Team",
    body:
      "Finance platform builders with SAP integration experience, data engineering, and AI product delivery. Advisory support from CFO operators.",
  },
  {
    title: "Ask",
    body:
      "Seeking seed funding to complete SAP connectors, productionize forecasting models, and scale pilot deployments.",
  },
];

export default function PitchPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="pill">Investor Narrative</div>
          <h1 style={{ marginTop: 16 }}>vCFO Pitch Deck</h1>
          <p className="muted" style={{ maxWidth: 720 }}>
            A focused overview of the opportunity, product advantage, and go-to-market
            strategy for a modern CFO intelligence layer.
          </p>
          <div className="grid grid-2" style={{ marginTop: 24 }}>
            {sections.map((section) => (
              <div className="card" key={section.title}>
                <h3 style={{ marginTop: 0 }}>{section.title}</h3>
                <p className="muted">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
