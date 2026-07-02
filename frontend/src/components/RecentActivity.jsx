import {
  FaFileInvoice,
  FaBoxOpen,
  FaCamera,
  FaUserPlus,
} from "react-icons/fa";

function RecentActivity({ invoices, products }) {
  const activities = [];

  invoices
    .slice(0, 3)
    .forEach((invoice) => {
      activities.push({
        icon: <FaFileInvoice />,
        title: `Invoice created for ${invoice.customer}`,
        time: invoice.date,
        color: "#2563eb",
      });
    });

  products
    .slice(-2)
    .reverse()
    .forEach((product) => {
      activities.push({
        icon: <FaBoxOpen />,
        title: `${product.name} added to inventory`,
        time: "Recently",
        color: "#16a34a",
      });
    });

  activities.unshift({
    icon: <FaCamera />,
    title: "Receipt Scanner Ready",
    time: "Now",
    color: "#7c3aed",
  });

  activities.unshift({
    icon: <FaUserPlus />,
    title: "AI Business Assistant Active",
    time: "Now",
    color: "#ea580c",
  });

  return (
    <section className="recent-activity card">

      <h2>📈 Recent Activity</h2>

      {activities.map((item, index) => (

        <div className="activity-item" key={index}>

          <div
            className="activity-icon"
            style={{ background: item.color }}
          >
            {item.icon}
          </div>

          <div className="activity-content">

            <strong>{item.title}</strong>

            <span>{item.time}</span>

          </div>

        </div>

      ))}

    </section>
  );
}

export default RecentActivity;