export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
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
