export default function DashboardPage() {
  const kpis = [
    { label: "Revenue", value: "$4.8M", change: "+6.4%" },
    { label: "EBITDA", value: "$1.2M", change: "+4.1%" },
    { label: "Net Income", value: "$740K", change: "+3.2%" },
    { label: "Cash Balance", value: "$9.6M", change: "+1.1%" },
  ];
  const trend = [3.2, 3.6, 3.9, 4.1, 4.3, 4.5, 4.8];
  const anomalies = [
    {
      title: "Large manual JE at month-end",
      score: "0.94",
      status: "Review",
      amount: "$220K",
    },
    {
      title: "Unusual AP payment timing",
      score: "0.82",
      status: "Monitor",
      amount: "$95K",
    },
  ];
  const cashForecast = [8.6, 8.4, 8.9, 9.2, 9.6, 10.1];

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Finance Command Center</h1>
          <p className="muted">
            Live KPI summary, cash outlook, and anomaly signals for the last 6 months.
          </p>
          <div className="grid grid-4" style={{ marginTop: 24 }}>
            {kpis.map((kpi) => (
              <div className="card" key={kpi.label}>
                <div className="muted">{kpi.label}</div>
                <div className="kpi">{kpi.value}</div>
                <div className="badge" style={{ marginTop: 8 }}>
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#f1f5f9" }}>
        <div className="container grid grid-2">
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Revenue trend (last 7 months)</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {trend.map((value, index) => (
                <div key={value}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Month {index + 1}</span>
                    <strong>${value.toFixed(1)}M</strong>
                  </div>
                  <div style={{ background: "#e2e8f0", borderRadius: 999, height: 10 }}>
                    <div
                      className="chart-bar"
                      style={{ width: `${Math.min(100, value * 18)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Cash forecast (next 6 months)</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {cashForecast.map((value, index) => (
                <div key={value}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Month {index + 1}</span>
                    <strong>${value.toFixed(1)}M</strong>
                  </div>
                  <div style={{ background: "#e2e8f0", borderRadius: 999, height: 10 }}>
                    <div
                      className="chart-bar"
                      style={{ width: `${Math.min(100, value * 10)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card">
            <h2 style={{ marginTop: 0 }}>KPI drivers</h2>
            <table className="table">
              <tbody>
                <tr>
                  <th>Driver</th>
                  <th>Impact</th>
                  <th>Trend</th>
                </tr>
                <tr>
                  <td>Pricing & mix</td>
                  <td>+2.1%</td>
                  <td>
                    <span className="badge pill-green">Improving</span>
                  </td>
                </tr>
                <tr>
                  <td>COGS efficiency</td>
                  <td>+1.3%</td>
                  <td>
                    <span className="badge pill-green">Stable</span>
                  </td>
                </tr>
                <tr>
                  <td>Sales headcount</td>
                  <td>-0.7%</td>
                  <td>
                    <span className="badge pill-amber">Watch</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Anomaly alerts</h2>
            {anomalies.map((alert) => (
              <div key={alert.title} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <strong>{alert.title}</strong>
                  <span className="badge pill-amber">{alert.status}</span>
                </div>
                <div className="muted">
                  Score {alert.score} · Exposure {alert.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
