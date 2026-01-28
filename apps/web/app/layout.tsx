export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <style>{`
          :root {
            color-scheme: light;
            font-family: "Inter", "Segoe UI", system-ui, sans-serif;
            background: #f8fafc;
            color: #0f172a;
          }
          * { box-sizing: border-box; }
          body { margin: 0; }
          a { color: inherit; text-decoration: none; }
          .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 24px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
          }
          .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 999px;
            background: #e2e8f0;
            font-size: 12px;
            font-weight: 600;
          }
          .grid {
            display: grid;
            gap: 16px;
          }
          .grid-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .grid-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .muted { color: #64748b; }
          .section { padding: 56px 0; }
          .hero {
            background: radial-gradient(circle at top, #e2e8f0 0%, #f8fafc 45%, #ffffff 100%);
            padding: 72px 0 56px;
          }
          .pill {
            display: inline-flex;
            gap: 8px;
            align-items: center;
            padding: 6px 12px;
            border-radius: 999px;
            border: 1px solid #cbd5f5;
            background: #eef2ff;
            font-weight: 600;
            font-size: 12px;
            color: #3730a3;
          }
          .cta {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #1d4ed8;
            color: #fff;
            padding: 12px 18px;
            border-radius: 12px;
            font-weight: 600;
          }
          .outline {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            border: 1px solid #94a3b8;
            padding: 12px 18px;
            border-radius: 12px;
            font-weight: 600;
          }
          .chart-bar {
            height: 10px;
            border-radius: 999px;
            background: linear-gradient(90deg, #22c55e, #3b82f6);
          }
          .kpi {
            font-size: 26px;
            font-weight: 700;
          }
          .nav {
            background: #ffffff;
            border-bottom: 1px solid #e2e8f0;
            position: sticky;
            top: 0;
            z-index: 10;
          }
          .nav-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 24px;
          }
          .nav-links {
            display: flex;
            gap: 16px;
            font-weight: 600;
            color: #475569;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
          }
          .table th, .table td {
            text-align: left;
            padding: 10px 0;
            border-bottom: 1px solid #e2e8f0;
          }
          .pill-green { background: #dcfce7; color: #166534; }
          .pill-red { background: #fee2e2; color: #991b1b; }
          .pill-amber { background: #fef3c7; color: #92400e; }
          @media (max-width: 900px) {
            .grid-2, .grid-3, .grid-4 { grid-template-columns: 1fr; }
            .nav-links { flex-wrap: wrap; }
          }
        `}</style>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <header className="nav">
            <div className="nav-inner container">
              <a href="/" style={{ fontWeight: 700, fontSize: 18 }}>
                vCFO
              </a>
              <nav className="nav-links">
                <a href="/dashboard">Dashboard</a>
                <a href="/scenarios">Scenarios</a>
                <a href="/assistant">Assistant</a>
                <a href="/settings">Settings</a>
                <a href="/pitch">Investor Pitch</a>
                <a href="/term-sheet">Term Sheet</a>
              </nav>
            </div>
          </header>
          <div style={{ flex: 1 }}>{children}</div>
          <footer style={{ padding: "24px 16px", borderTop: "1px solid #e5e7eb" }}>
            <small>
              Credits: SOLINEXTA TECHNOLOGIES - Leading AI Solutions Provider (
              <a href="https://solinexta-ai.com/" target="_blank" rel="noreferrer">
                source
              </a>
              ).
            </small>
          </footer>
        </div>
      </body>
    </html>
  );
}
