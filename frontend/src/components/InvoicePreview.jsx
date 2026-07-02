
import { downloadPDF } from "../services/api";
import {
  FaDownload,
  FaPrint,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaQrcode,
  FaShareAlt,
} from "react-icons/fa";

function InvoicePreview({ invoice, html, company }) {
  async function handleDownload() {
    try {
      const pdfBlob = await downloadPDF(html);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = url;
      link.download = "Invoice.pdf";
      link.click();

      window.URL.revokeObjectURL(url);
    } catch {
      alert("Failed to download PDF");
    }
  }

  function handlePrint() {
    window.print();
  }

  if (!invoice) {
    return (
      <div className="invoice-empty card">
        <FaBuilding />
        <h2>No Invoice Yet</h2>
        <p>Create an invoice or scan a receipt to preview it here.</p>
      </div>
    );
  }

  const invoiceNumber =
    "INV-" + new Date().getFullYear() + "-" + Date.now().toString().slice(-5);

  const invoiceDate = new Date().toLocaleDateString("en-IN");

  return (
    <div className="premium-invoice card">
      <div className="premium-invoice-top">
        <div className="company-block">
          {company?.logo ? (
            <img src={company.logo} alt="Company Logo" className="premium-logo" />
          ) : (
            <div className="premium-logo-placeholder">S</div>
          )}

          <div>
            <h1>{company?.name || "SmartBiz AI"}</h1>
            <p>{company?.address || "Your company address"}</p>
            <p>
              {company?.email || "company@email.com"} |{" "}
              {company?.phone || "+91 XXXXX XXXXX"}
            </p>
            {company?.gst && <p>GSTIN: {company.gst}</p>}
          </div>
        </div>

        <div className="invoice-id-block">
          <span className="status-pill pending">PENDING</span>
          <h2>INVOICE</h2>
          <p>{invoiceNumber}</p>
          <p>
            <FaCalendarAlt /> {invoiceDate}
          </p>
        </div>
      </div>

      <div className="invoice-info-grid">
        <div>
          <span>Bill To</span>
          <h3>{invoice.customer_name}</h3>
        </div>

        <div>
          <span>Payment Method</span>
          <h3>{invoice.payment_method || "Unknown"}</h3>
        </div>
      </div>

      <div className="premium-table">
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.products.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>₹{item.unit_price}</td>
                <td>₹{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="invoice-bottom-grid">
        <div className="qr-signature-box">
          <div className="qr-box fake-qr-box">
  <div className="fake-qr">
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
    <span></span><span></span><span></span>
  </div>
  <p>Scan to Pay</p>
</div>

          <div className="signature-line">
            <span>Authorized Signature</span>
          </div>
        </div>

        <div className="premium-total-box">
          <div>
            <span>Subtotal</span>
            <strong>₹{invoice.subtotal}</strong>
          </div>

          <div>
            <span>GST ({invoice.gst_percent}%)</span>
            <strong>₹{invoice.gst_amount}</strong>
          </div>

          <div className="premium-grand-total">
            <span>Grand Total</span>
            <strong>₹{invoice.grand_total}</strong>
          </div>
        </div>
      </div>

      <div className="invoice-thankyou">
        <h3>Thank you for your business!</h3>
        <p>This invoice was generated using SmartBiz AI.</p>
      </div>

      <div className="premium-invoice-actions">
        <button onClick={handleDownload}>
          <FaDownload /> Download
        </button>

        <button onClick={handlePrint}>
          <FaPrint /> Print
        </button>

        <button onClick={() => alert("Email feature coming next")}>
          <FaEnvelope /> Email
        </button>

        <button onClick={() => alert("Share feature coming next")}>
          <FaShareAlt /> Share
        </button>
      </div>
    </div>
  );
}

export default InvoicePreview;