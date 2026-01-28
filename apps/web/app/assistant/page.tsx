export default function AssistantPage() {
  return (
    <main>
      <section className="section">
        <div className="container grid grid-2">
          <div>
            <h1>AI CFO Assistant</h1>
            <p className="muted">
              Ask finance questions in natural language and get driver-based
              explanations with recommended actions.
            </p>
            <div className="card" style={{ marginTop: 24 }}>
              <h3 style={{ marginTop: 0 }}>Sample conversation</h3>
              <div style={{ marginBottom: 12 }}>
                <strong>You</strong>
                <p className="muted">Why did EBITDA drop in Europe this month?</p>
              </div>
              <div>
                <strong>vCFO</strong>
                <p className="muted">
                  EBITDA declined 1.2 points due to a 4% mix shift toward lower-margin
                  services and a one-time logistics surcharge. Pricing remains stable.
                </p>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Insight cards</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Margin driver</strong>
                  <span className="badge pill-amber">-0.8 pts</span>
                </div>
                <p className="muted">Mix shift toward lower-margin contracts.</p>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Cash risk</strong>
                  <span className="badge pill-red">High</span>
                </div>
                <p className="muted">AR aging trend suggests delayed collections in NA.</p>
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>Action</strong>
                  <span className="badge pill-green">Recommended</span>
                </div>
                <p className="muted">Reprice top 5 renewals and tighten discounting.</p>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <h4>Suggested follow-ups</h4>
              <ul>
                <li>Show top 10 customers by margin decline.</li>
                <li>Simulate FX hedge for next quarter.</li>
                <li>Compare EMEA vs APAC pipeline risk.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
