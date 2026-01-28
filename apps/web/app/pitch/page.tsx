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
      <h1>Investor Pitch</h1>
      <p>Concise overview of the vCFO opportunity.</p>
      {sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </section>
      ))}
    </main>
  );
}
