import {
  FaCamera,
  FaFileInvoice,
  FaUserPlus,
  FaBoxOpen,
} from "react-icons/fa";

function QuickActions({
  onScanReceipt,
  onCreateInvoice,
  onAddCustomer,
  onAddProduct,
}) {
  const actions = [
    {
      icon: <FaCamera />,
      title: "Scan Receipt",
      subtitle: "OCR + AI",
      color: "#2563eb",
      action: onScanReceipt,
    },
    {
      icon: <FaFileInvoice />,
      title: "New Invoice",
      subtitle: "AI Generator",
      color: "#7c3aed",
      action: onCreateInvoice,
    },
    {
      icon: <FaUserPlus />,
      title: "New Customer",
      subtitle: "CRM",
      color: "#16a34a",
      action: onAddCustomer,
    },
    {
      icon: <FaBoxOpen />,
      title: "Add Product",
      subtitle: "Inventory",
      color: "#ea580c",
      action: onAddProduct,
    },
  ];

  return (
    <section className="quick-actions">
      <h2>⚡ Quick Actions</h2>

      <div className="quick-grid">
        {actions.map((item, index) => (
          <div
            key={index}
            className="quick-card"
            onClick={item.action}
          >
            <div
              className="quick-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>
            <p>{item.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;