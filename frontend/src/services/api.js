export async function generateInvoice(message) {
  const response = await fetch("http://localhost:5001/generate-invoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return response.json();
}

export async function receiptToInvoice(receiptText) {
  const response = await fetch("http://localhost:5001/receipt-to-invoice", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiptText }),
  });

  return response.json();
}

export async function downloadPDF(html) {
  const response = await fetch("http://localhost:5001/generate-pdf", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });

  return response.blob();
}
export async function askBusinessCopilot(question, invoices) {
  const response = await fetch("http://localhost:5001/business-copilot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, invoices }),
  });

  return response.json();
}