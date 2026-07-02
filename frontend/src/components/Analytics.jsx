import StatsCards from "./StatsCards";
import RevenueChart from "./RevenueChart";
import BusinessHealth from "./BusinessHealth";
import PaymentAnalytics from "./PaymentAnalytics";

function Analytics({ invoices }) {
  return (
    <div className="analytics-page">
      <div className="products-header card">
        <div>
          <p className="section-label">Business Intelligence</p>
          <h1>Analytics</h1>
          <span>Understand revenue, payments, business health and growth.</span>
        </div>
      </div>

      <StatsCards invoices={invoices} />

      <div className="analytics-layout">
        <RevenueChart invoices={invoices} />
        <BusinessHealth invoices={invoices} />
      </div>

      <PaymentAnalytics invoices={invoices} />
    </div>
  );
}

export default Analytics;
