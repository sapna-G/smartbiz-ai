import { useState } from "react";
import {
  FaSearch,
  FaFileInvoice,
  FaTrash,
  FaEye,
  FaRupeeSign,
} from "react-icons/fa";

function InvoiceHistory({ history, onSelect, onDelete, onStatusChange }) {
  const [search, setSearch] = useState("");

  const filteredHistory = history.filter((item) =>
    item.customer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="invoice-history-page">
      <div className="products-header card">
        <div>
          <p className="section-label">Billing Center</p>
          <h1>Invoice History</h1>
          <span>Track, open, update and manage all generated invoices.</span>
        </div>

        <div className="product-search">
          <FaSearch />
          <input
            placeholder="Search by customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="card empty-products">
          <FaFileInvoice />
          <h2>No invoices found</h2>
          <p>Create your first invoice using AI Invoice Studio.</p>
        </div>
      ) : (
        <div className="invoice-card-list">
          {filteredHistory.map((item) => (
            <div className="invoice-history-card card" key={item.id}>
              <div className="invoice-customer">
                <div className="customer-mini-avatar">
                  {item.customer.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2>{item.customer}</h2>
                  <p>{item.date}</p>
                </div>
              </div>

              <div className="invoice-history-total">
                <FaRupeeSign />
                <strong>{item.total}</strong>
              </div>

              <div className="invoice-meta-pill">{item.payment}</div>

              <select
                className={`status-select ${item.status?.toLowerCase()}`}
                value={item.status || "Pending"}
                onChange={(e) => onStatusChange(item.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>

              <div className="invoice-card-actions">
                <button onClick={() => onSelect(item)} className="view-invoice-btn">
                  <FaEye /> View
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  className="delete-invoice-btn"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InvoiceHistory;