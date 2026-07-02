const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return data;
}

export async function generateInvoice(message) {
  const response = await fetch(`${API_BASE_URL}/generate-invoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return handleResponse(response);
}

export async function receiptToInvoice(receiptText) {
  const response = await fetch(`${API_BASE_URL}/receipt-to-invoice`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ receiptText }),
  });

  return handleResponse(response);
}

export async function downloadPDF(html) {
  const response = await fetch(`${API_BASE_URL}/generate-pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ html }),
  });

  if (!response.ok) {
    throw new Error("Failed to download PDF.");
  }

  return response.blob();
}

export async function askBusinessCopilot(question, invoices) {
  const response = await fetch(`${API_BASE_URL}/business-copilot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, invoices }),
  });

  return handleResponse(response);
}