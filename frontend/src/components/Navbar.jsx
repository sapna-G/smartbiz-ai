import { FaFileInvoiceDollar, FaCog } from "react-icons/fa";

function Navbar({ onOpenSettings }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaFileInvoiceDollar className="logo-icon" />

        <div>
          <h2>Smart Invoice AI</h2>
          <p>Create professional invoices in seconds</p>
        </div>
      </div>

      <button className="settings-btn" onClick={onOpenSettings}>
        <FaCog />
        Settings
      </button>
    </nav>
  );
}

export default Navbar;