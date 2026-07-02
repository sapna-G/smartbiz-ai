function BusinessHealth({ invoices }) {
  const total = invoices.length;

  const paid = invoices.filter(i => i.status === "Paid").length;
  const pending = invoices.filter(i => i.status === "Pending").length;
  const overdue = invoices.filter(i => i.status === "Overdue").length;

  let score = 100;

  score -= pending * 5;
  score -= overdue * 10;

  if (score < 0) score = 0;

  let color = "#16a34a";

  if (score < 80) color = "#f59e0b";
  if (score < 60) color = "#dc2626";

  return (
    <div className="card business-health">
      <h2>💚 Business Health</h2>

      <div className="health-circle" style={{ color }}>
        {score}
      </div>

      <p>Business Score</p>

      <ul className="health-list">
        <li>✅ Paid Invoices: {paid}</li>
        <li>⏳ Pending: {pending}</li>
        <li>❌ Overdue: {overdue}</li>
        <li>📄 Total Invoices: {total}</li>
      </ul>

      <div className="health-tip">
        {score >= 90 &&
          "Excellent! Your business is performing very well."}

        {score >= 70 &&
          score < 90 &&
          "Good performance. Follow up on pending invoices."}

        {score < 70 &&
          "Business needs attention. Reduce overdue invoices first."}
      </div>
    </div>
  );
}

export default BusinessHealth;