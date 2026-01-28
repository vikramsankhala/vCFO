export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <div className="pill">AI CFO OS</div>
          <h1 style={{ fontSize: 48, margin: "16px 0 12px" }}>
            Run finance like a modern command center
          </h1>
          <p className="muted" style={{ fontSize: 18, maxWidth: 680 }}>
            vCFO is a proof-of-concept platform that unifies ERP data, automates KPI
            reporting, and delivers AI-driven insights for faster cash and margin decisions.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            <a className="cta" href="/dashboard">
              View Live Demo
            </a>
            <a className="outline" href="/pitch">
              Investor Pitch
            </a>
          </div>
          <div className="grid grid-3" style={{ marginTop: 36 }}>
            {[
              { label: "Monthly Revenue", value: "$4.8M", note: "+6.4% MoM" },
              { label: "Cash Runway", value: "13.2 months", note: "Upside +2.1" },
              { label: "Forecast Accuracy", value: "92%", note: "Last 6 months" },
            ].map((stat) => (
              <div className="card" key={stat.label}>
                <div className="muted">{stat.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>{stat.value}</div>
                <div className="badge" style={{ marginTop: 8 }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {[
              {
                title: "Unified Finance Signals",
                body: "Consolidate P&L, balance sheet, and cash into a single, auditable model.",
              },
              {
                title: "Scenario Planning",
                body: "Compare growth, cost, and capital choices with modeled KPI outcomes.",
              },
              {
                title: "AI CFO Assistant",
                body: "Ask questions in plain language and get driver-based insights instantly.",
              },
            ].map((feature) => (
              <div className="card" key={feature.title}>
                <h3 style={{ marginTop: 0 }}>{feature.title}</h3>
                <p className="muted">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#f1f5f9" }}>
        <div className="container grid grid-2">
          <div>
            <h2>How it works</h2>
            <p className="muted">
              Connect ERP data, translate it into finance facts, then surface KPIs,
              forecasts, and alerts. Every insight links back to source records.
            </p>
            <div style={{ marginTop: 16 }}>
              {[
                "Ingest SAP S/4HANA finance data",
                "Normalize into CFO-grade KPI models",
                "Simulate scenarios and compare outcomes",
                "Explain variance with AI-driven commentary",
              ].map((step) => (
                <div key={step} style={{ marginBottom: 10 }}>
                  <span className="badge">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Live KPI pulse</h3>
            <div style={{ display: "grid", gap: 12 }}>
              {[
                { label: "Revenue", value: 82 },
                { label: "EBITDA Margin", value: 63 },
                { label: "Free Cash Flow", value: 54 },
                { label: "Net Debt / EBITDA", value: 41 },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{item.label}</span>
                    <strong>{item.value}%</strong>
                  </div>
                  <div style={{ background: "#e2e8f0", borderRadius: 999, height: 10 }}>
                    <div className="chart-bar" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Explore the demo</h2>
          <div className="grid grid-3" style={{ marginTop: 16 }}>
            {[
              { title: "Dashboard", href: "/dashboard", note: "KPIs, trends, alerts" },
              { title: "Scenarios", href: "/scenarios", note: "Compare strategic levers" },
              { title: "Assistant", href: "/assistant", note: "Ask questions, get answers" },
              { title: "Settings", href: "/settings", note: "Mappings and integrations" },
              { title: "Investor Pitch", href: "/pitch", note: "Product narrative" },
              { title: "Term Sheet", href: "/term-sheet", note: "Draft terms" },
            ].map((item) => (
              <a className="card" href={item.href} key={item.title}>
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                <p className="muted">{item.note}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
