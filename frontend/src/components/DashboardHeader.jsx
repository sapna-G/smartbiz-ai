import { FaBell, FaCog, FaSearch } from "react-icons/fa";

function DashboardHeader({ onOpenSettings }) {
  return (
    <header className="dashboard-header">
      <div>
        <h1>Welcome back 👋</h1>
        <p>Create and manage AI-powered invoices</p>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FaSearch />
          <input placeholder="Search invoices..." />
        </div>

        <button className="icon-btn">
          <FaBell />
        </button>

        <button className="icon-btn" onClick={onOpenSettings}>
          <FaCog />
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;