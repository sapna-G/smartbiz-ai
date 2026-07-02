import CopilotPanel from "./CopilotPanel";
import TodayInsights from "./TodayInsights";
import QuickActions from "./QuickActions";

function AIAssistant({ invoices, products, onCreateInvoice, onScanReceipt }) {
  return (
    <div className="ai-assistant-page">
      <div className="products-header card">
        <div>
          <p className="section-label">Smart AI Assistant</p>
          <h1>AI Business Copilot</h1>
          <span>
            Ask questions about revenue, customers, invoices, products and business growth.
          </span>
        </div>
      </div>

      <div className="ai-assistant-layout">
        <div>
          <CopilotPanel invoices={invoices} />
        </div>

        <div className="ai-assistant-side">
          <TodayInsights invoices={invoices} products={products} />

          <QuickActions
            onCreateInvoice={onCreateInvoice}
            onScanReceipt={onScanReceipt}
            onAddCustomer={() => alert("Customer page is ready in sidebar.")}
            onAddProduct={() => alert("Product page is ready in sidebar.")}
          />
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;
