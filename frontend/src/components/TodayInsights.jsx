function TodayInsights({ invoices, products }) {
  const revenue = invoices.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const pending = invoices.filter(
    (item) => item.status === "Pending"
  ).length;

  const lowStock = products.filter(
    (item) => item.stock <= 5
  ).length;

  const topCustomer =
    invoices.length > 0
      ? invoices.reduce((a, b) =>
          Number(a.total) > Number(b.total) ? a : b
        ).customer
      : "No customer yet";

  return (
    <section className="today-insights card">

      <h2>✨ Today's Insights</h2>

      <div className="insight-item success">
        🟢 Revenue Generated
        <strong>₹{revenue}</strong>
      </div>

      <div className="insight-item warning">
        🟡 Pending Invoices
        <strong>{pending}</strong>
      </div>

      <div className="insight-item danger">
        🔴 Low Stock Products
        <strong>{lowStock}</strong>
      </div>

      <div className="insight-item purple">
        🟣 Top Customer
        <strong>{topCustomer}</strong>
      </div>

    </section>
  );
}

export default TodayInsights;