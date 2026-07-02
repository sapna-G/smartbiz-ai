import { FaUser, FaRupeeSign, FaFileInvoice, FaClock } from "react-icons/fa";

function Customers({ invoices }) {
  const customers = invoices.reduce((acc, item) => {
    if (!acc[item.customer]) {
      acc[item.customer] = {
        name: item.customer,
        totalSpent: 0,
        invoices: 0,
        pending: 0,
        lastPurchase: item.date,
      };
    }

    acc[item.customer].totalSpent += Number(item.total || 0);
    acc[item.customer].invoices += 1;

    if (item.status === "Pending") {
      acc[item.customer].pending += Number(item.total || 0);
    }

    acc[item.customer].lastPurchase = item.date;

    return acc;
  }, {});

  const customerList = Object.values(customers);

  return (
    <div className="customers-page">
      <div className="products-header card">
        <div>
          <p className="section-label">Customer Relationship Manager</p>
          <h1>Customers</h1>
          <span>Track customer spending, invoices and pending payments.</span>
        </div>
      </div>

      {customerList.length === 0 ? (
        <div className="card empty-products">
          <FaUser />
          <h2>No customers yet</h2>
          <p>Generate invoices to automatically create customer profiles.</p>
        </div>
      ) : (
        <div className="customer-card-grid">
          {customerList.map((customer) => (
            <div className="customer-card card" key={customer.name}>
              <div className="customer-avatar">
                {customer.name.charAt(0).toUpperCase()}
              </div>

              <h2>{customer.name}</h2>

              <div className="customer-metrics">
                <div>
                  <FaRupeeSign />
                  <span>Lifetime Spend</span>
                  <strong>₹{customer.totalSpent}</strong>
                </div>

                <div>
                  <FaFileInvoice />
                  <span>Invoices</span>
                  <strong>{customer.invoices}</strong>
                </div>

                <div>
                  <FaClock />
                  <span>Pending</span>
                  <strong>₹{customer.pending}</strong>
                </div>
              </div>

              <p className="last-purchase">
                Last purchase: {customer.lastPurchase}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Customers;