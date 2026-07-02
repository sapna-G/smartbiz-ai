function DashboardHero({ invoices, products }) {
  const totalRevenue = invoices.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const orders = invoices.length;
  const customers = new Set(invoices.map((item) => item.customer)).size;
  const productCount = products.length;

  return (
    <section className="dashboard-hero">
      <div>
        <p className="hero-label">SmartBiz AI</p>
        <h1>Good Morning, Sapna 👋</h1>
        <p className="hero-subtitle">Here’s your business today.</p>
      </div>

      <div className="hero-stats">
        <div>
          <span>Revenue</span>
          <h2>₹{totalRevenue}</h2>
          <p>+18%</p>
        </div>

        <div>
          <span>Orders</span>
          <h2>{orders}</h2>
          <p>+12</p>
        </div>

        <div>
          <span>Customers</span>
          <h2>{customers}</h2>
          <p>+3</p>
        </div>

        <div>
          <span>Products</span>
          <h2>{productCount}</h2>
          <p>+6</p>
        </div>
      </div>
    </section>
  );
}

export default DashboardHero;