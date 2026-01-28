const terms = [
  { label: "Round", value: "Seed" },
  { label: "Target Raise", value: "$1.5M" },
  { label: "Pre-Money Valuation", value: "$6.0M" },
  { label: "Instrument", value: "Equity" },
  { label: "Use of Proceeds", value: "Product, data ingestion, GTM pilots" },
  { label: "Option Pool", value: "10% post-money" },
  { label: "Board", value: "2 founders, 1 investor, 1 independent" },
  { label: "Information Rights", value: "Quarterly financials, KPI reporting" },
  { label: "Investor Protections", value: "Standard protective provisions" },
  { label: "Liquidation Preference", value: "1x non-participating" },
  { label: "Dividends", value: "Non-cumulative" },
  { label: "Pro Rata Rights", value: "Yes" },
  { label: "Founder Vesting", value: "4 years, 1-year cliff" },
  { label: "Closing Timeline", value: "60 days" },
];

export default function TermSheetPage() {
  return (
    <main>
      <h1>Term Sheet (Draft)</h1>
      <p>Indicative, non-binding terms for discussion.</p>
      <table>
        <tbody>
          {terms.map((term) => (
            <tr key={term.label}>
              <td style={{ paddingRight: 16, fontWeight: 600 }}>{term.label}</td>
              <td>{term.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
