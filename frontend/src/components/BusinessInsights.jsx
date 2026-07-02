function BusinessInsights({ invoices }) {
  const totalRevenue = invoices.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const topCustomer =
    invoices.length > 0
      ? invoices.reduce((max, item) =>
          Number(item.total) > Number(max.total) ? item : max
        ).customer
      : "No customer yet";

  const pendingCount = invoices.filter(
    (item) => item.status === "Pending"
  ).length;

  const mostRecent = invoices[0];

  return (
    <div className="card insights-card">
      <h2>AI Business Insights</h2>

      <div className="insight-list">
        <p>💰 Total revenue generated: <strong>₹{totalRevenue}</strong></p>

        <p>👤 Top customer: <strong>{topCustomer}</strong></p>

        <p>⏳ Pending invoices: <strong>{pendingCount}</strong></p>

        {mostRecent && (
          <p>
            🧾 Latest invoice was created for{" "}
            <strong>{mostRecent.customer}</strong>.
          </p>
        )}

        <p>
          💡 Suggestion: Keep tracking pending invoices and follow up with
          customers regularly.
        </p>
      </div>
    </div>
  );
}

export default BusinessInsights;