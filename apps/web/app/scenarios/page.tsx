export default function ScenariosPage() {
  const scenarios = [
    {
      name: "Base Case",
      revenue: "$52.4M",
      ebitda: "$12.1M",
      cash: "$9.6M",
      roic: "14.5%",
      status: "Active",
    },
    {
      name: "Capex Cut 20%",
      revenue: "$51.1M",
      ebitda: "$12.9M",
      cash: "$10.8M",
      roic: "16.2%",
      status: "Simulated",
    },
    {
      name: "Growth Push",
      revenue: "$56.8M",
      ebitda: "$11.7M",
      cash: "$8.4M",
      roic: "13.1%",
      status: "Simulated",
    },
  ];
  const driverImpacts = [
    { label: "Revenue Growth +3%", impact: "+$3.2M", sentiment: "pill-green" },
    { label: "COGS Efficiency +1.5%", impact: "+$0.9M", sentiment: "pill-green" },
    { label: "Headcount +8%", impact: "-$1.1M", sentiment: "pill-red" },
    { label: "Capex Delay", impact: "+$1.4M", sentiment: "pill-green" },
  ];

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Scenario Planning</h1>
          <p className="muted">
            Compare strategic levers across KPIs with AI-assisted variance insights.
          </p>
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {scenarios.map((scenario) => (
              <div className="card" key={scenario.name}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ marginTop: 0 }}>{scenario.name}</h3>
                  <span className="badge">{scenario.status}</span>
                </div>
                <div className="muted">Revenue</div>
                <div className="kpi">{scenario.revenue}</div>
                <div style={{ marginTop: 12 }} className="grid grid-2">
                  <div>
                    <div className="muted">EBITDA</div>
                    <strong>{scenario.ebitda}</strong>
                  </div>
                  <div>
                    <div className="muted">Cash</div>
                    <strong>{scenario.cash}</strong>
                  </div>
                  <div>
                    <div className="muted">ROIC</div>
                    <strong>{scenario.roic}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#f1f5f9" }}>
        <div className="container grid grid-2">
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Driver impact summary</h2>
            {driverImpacts.map((driver) => (
              <div key={driver.label} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{driver.label}</span>
                  <span className={`badge ${driver.sentiment}`}>{driver.impact}</span>
                </div>
                <div style={{ background: "#e2e8f0", height: 8, borderRadius: 999 }}>
                  <div className="chart-bar" style={{ width: "70%" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Scenario narrative</h2>
            <p className="muted">
              The Capex Cut scenario lifts ROIC by 1.7 points while preserving
              EBITDA, driven by deferred infrastructure spend and improved
              working-capital efficiency. Growth Push improves revenue but
              compresses near-term cash.
            </p>
            <div className="grid grid-2" style={{ marginTop: 16 }}>
              <div>
                <div className="muted">Best for</div>
                <strong>Cash preservation</strong>
              </div>
              <div>
                <div className="muted">Risk level</div>
                <strong>Moderate</strong>
              </div>
              <div>
                <div className="muted">Decision window</div>
                <strong>Next 30 days</strong>
              </div>
              <div>
                <div className="muted">Estimated ROI</div>
                <strong>18%</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
