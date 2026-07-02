function PaymentAnalytics({ invoices }) {
  const paymentCounts = invoices.reduce((acc, item) => {
    const method = item.payment || "Unknown";
    acc[method] = (acc[method] || 0) + 1;
    return acc;
  }, {});

  const methods = Object.entries(paymentCounts);

  return (
    <div className="card payment-analytics">
      <h2>Payment Analytics</h2>

      {methods.length === 0 ? (
        <p>No payment data yet.</p>
      ) : (
        <div className="payment-list">
          {methods.map(([method, count]) => (
            <div className="payment-item" key={method}>
              <span>{method}</span>
              <strong>{count} invoices</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PaymentAnalytics;