
import {
  FaHome,
  FaFileInvoice,
  FaUsers,
  FaChartPie,
  FaCog,
  FaBoxOpen,
  FaRobot,
  FaCrown,
} from "react-icons/fa";
function Sidebar({ activePage, setActivePage, onOpenSettings }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">S</div>
        <div>
          <h2>SmartBiz AI</h2>
          <p>Business OS</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        <a
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          <FaHome /> Dashboard
        </a>

        <a
          className={activePage === "invoices" ? "active" : ""}
          onClick={() => setActivePage("invoices")}
        >
          <FaFileInvoice /> Invoices
        </a>

        <a
          className={activePage === "customers" ? "active" : ""}
          onClick={() => setActivePage("customers")}
        >
          <FaUsers /> Customers
        </a>

        <a
          className={activePage === "products" ? "active" : ""}
          onClick={() => setActivePage("products")}
        >
          <FaBoxOpen /> Products
        </a>
<a
  className={activePage === "analytics" ? "active" : ""}
  onClick={() => setActivePage("analytics")}
>
  <FaChartPie /> Analytics
</a>

        <a
  className={activePage === "assistant" ? "active" : ""}
  onClick={() => setActivePage("assistant")}
>
  <FaRobot /> AI Assistant
</a>

        <a onClick={onOpenSettings}>
  <FaCog /> Settings
</a>
      </nav>

      <div className="upgrade-card">
        <FaCrown />
        <h3>Free Plan</h3>
        <p>Upgrade for cloud sync & advanced AI.</p>
        <button>Upgrade</button>
      </div>

      <div className="user-card">
        <div className="avatar">S</div>
        <div>
          <strong>Sapna G.</strong>
          <p>Founder Mode</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;