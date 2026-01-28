export default function SettingsPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Integrations & Settings</h1>
          <p className="muted">
            Manage company mappings, data ingestion status, and governance settings.
          </p>
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {[
              { title: "SAP S/4HANA", status: "Connected", detail: "Last sync 2h ago" },
              { title: "Treasury Feeds", status: "Connected", detail: "Daily batch" },
              { title: "Bank APIs", status: "Pending", detail: "Waiting on approval" },
            ].map((item) => (
              <div className="card" key={item.title}>
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                <div className="badge">{item.status}</div>
                <p className="muted" style={{ marginTop: 10 }}>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#f1f5f9" }}>
        <div className="container grid grid-2">
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Company mappings</h2>
            <table className="table">
              <tbody>
                <tr>
                  <th>Business Unit</th>
                  <th>Company Code</th>
                  <th>Currency</th>
                </tr>
                <tr>
                  <td>North America</td>
                  <td>1000</td>
                  <td>USD</td>
                </tr>
                <tr>
                  <td>Europe</td>
                  <td>2000</td>
                  <td>EUR</td>
                </tr>
                <tr>
                  <td>APAC</td>
                  <td>3000</td>
                  <td>SGD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h2 style={{ marginTop: 0 }}>Governance</h2>
            <p className="muted">
              Role-based access and audit controls for finance and data teams.
            </p>
            <div className="grid" style={{ marginTop: 12 }}>
              <div>
                <strong>Roles enabled</strong>
                <div className="muted">CFO, Controller, Analyst, ReadOnly</div>
              </div>
              <div>
                <strong>Audit window</strong>
                <div className="muted">Retention 24 months</div>
              </div>
              <div>
                <strong>Data refresh</strong>
                <div className="muted">Hourly incremental load</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
