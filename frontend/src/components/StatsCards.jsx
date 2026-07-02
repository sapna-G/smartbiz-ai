import { FaFileInvoice, FaRupeeSign, FaClock, FaCheckCircle } from "react-icons/fa";

function StatsCards({ invoices }) {
  const totalInvoices = invoices.length;

  const totalRevenue = invoices.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const pendingInvoices = invoices.filter(
    (item) => item.status === "Pending"
  ).length;

  const paidInvoices = invoices.filter(
    (item) => item.status === "Paid"
  ).length;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue}`,
      icon: <FaRupeeSign />,
      className: "revenue",
    },
    {
      title: "Total Invoices",
      value: totalInvoices,
      icon: <FaFileInvoice />,
      className: "invoice",
    },
    {
      title: "Pending",
      value: pendingInvoices,
      icon: <FaClock />,
      className: "pending-card",
    },
    {
      title: "Paid",
      value: paidInvoices,
      icon: <FaCheckCircle />,
      className: "paid-card",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div className={`stat-card ${stat.className}`} key={index}>
          <div className="stat-icon">{stat.icon}</div>

          <div>
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;