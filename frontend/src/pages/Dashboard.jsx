import AIAssistant from "../components/AIAssistant";
import Analytics from "../components/Analytics";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardHero from "../components/DashboardHero";
import CopilotPanel from "../components/CopilotPanel";
import TodayInsights from "../components/TodayInsights";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import StatsCards from "../components/StatsCards";
import RevenueChart from "../components/RevenueChart";
import ReceiptScanner from "../components/ReceiptScanner";
import InvoiceForm from "../components/InvoiceForm";
import InvoicePreview from "../components/InvoicePreview";
import SettingsPanel from "../components/SettingsPanel";
import InvoiceHistory from "../components/InvoiceHistory";
import Customers from "../components/Customers";
import ProductCatalog from "../components/ProductCatalog";
import BusinessHealth from "../components/BusinessHealth";
import PaymentAnalytics from "../components/PaymentAnalytics";

function Dashboard({
  invoice,
  html,
  company,
  setCompany,
  loading,
  handleGenerate,
  settingsOpen,
  setSettingsOpen,
  invoiceHistory,
  openSavedInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  handleReceiptInvoice,
  products,
  setProducts,
}) {
  const [activePage, setActivePage] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("Overview");

  function handleOpenInvoice(item) {
    openSavedInvoice(item);
    setActivePage("dashboard");
    setActiveTab("Invoices");
  }

  return (
    <div className="dashboard-layout">
      <Sidebar
  activePage={activePage}
  setActivePage={setActivePage}
  onOpenSettings={() => setSettingsOpen(true)}
/>

      <main className="dashboard-content">
        <DashboardHeader onOpenSettings={() => setSettingsOpen(true)} />

        {activePage === "dashboard" && (
          <div className="dashboard-v3">
            <DashboardHero invoices={invoiceHistory} products={products} />

            <div className="dashboard-tabs">
              {["Overview", "AI Tools", "Invoices", "Analytics"].map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "tab active-tab" : "tab"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Overview" && (
              <div className="dashboard-main-grid">
                <div className="dashboard-left">
                  <CopilotPanel invoices={invoiceHistory} />
                  <TodayInsights invoices={invoiceHistory} products={products} />
                  <QuickActions
                    onScanReceipt={() => setActiveTab("AI Tools")}
                    onCreateInvoice={() => setActiveTab("AI Tools")}
                    onAddCustomer={() => setActivePage("customers")}
                    onAddProduct={() => setActivePage("products")}
                  />
                </div>

                <div className="dashboard-right">
                  <RecentActivity invoices={invoiceHistory} products={products} />
                </div>
              </div>
            )}

          {activeTab === "AI Tools" && (
  <div className="ai-tools-layout">
    <div className="ai-tools-left">
      <ReceiptScanner onInvoiceCreated={handleReceiptInvoice} />
      <InvoiceForm onGenerate={handleGenerate} loading={loading} />
    </div>

    <div className="ai-tools-right">
      <InvoicePreview invoice={invoice} html={html} company={company} />
    </div>
  </div>
)}

            {activeTab === "Invoices" && (
              <InvoicePreview invoice={invoice} html={html} company={company} />
            )}

            {activeTab === "Analytics" && (
              <>
                <StatsCards invoices={invoiceHistory} />
                <BusinessHealth invoices={invoiceHistory} />
                <PaymentAnalytics invoices={invoiceHistory} />
                <RevenueChart invoices={invoiceHistory} />
              </>
            )}
          </div>
        )}

        {activePage === "invoices" && (
          <InvoiceHistory
            history={invoiceHistory}
            onSelect={handleOpenInvoice}
            onDelete={deleteInvoice}
            onStatusChange={updateInvoiceStatus}
          />
        )}

        {activePage === "customers" && <Customers invoices={invoiceHistory} />}

        {activePage === "products" && (
          <ProductCatalog products={products} setProducts={setProducts} />
        )}
        {activePage === "analytics" && (
  <Analytics invoices={invoiceHistory} />
)}
{activePage === "assistant" && (
  <AIAssistant
    invoices={invoiceHistory}
    products={products}
    onCreateInvoice={() => {
      setActivePage("dashboard");
      setActiveTab("AI Tools");
    }}
    onScanReceipt={() => {
      setActivePage("dashboard");
      setActiveTab("AI Tools");
    }}
  />
)}
      </main>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        company={company}
        setCompany={setCompany}
      />
    </div>
  );
}

export default Dashboard;