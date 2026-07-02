function DashboardTabs({ activeTab, setActiveTab }) {
  const tabs = [
    "Overview",
    "AI Tools",
    "Invoices",
    "Analytics",
  ];

  return (
    <div className="dashboard-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? "tab active-tab" : "tab"}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default DashboardTabs;