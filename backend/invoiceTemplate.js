

function generateInvoiceHTML(invoice) {
  const productRows = invoice.products
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>₹${item.unit_price}</td>
          <td>₹${item.total}</td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Invoice</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f4f4f4;
      padding: 30px;
    }

    .invoice {
      max-width: 700px;
      margin: auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.15);
    }

    h1 {
      text-align: center;
      color: #2c3e50;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
    }

    th {
      background: #2c3e50;
      color: white;
    }

    .total {
      margin-top: 25px;
      text-align: right;
      font-size: 18px;
      font-weight: bold;
    }

    .footer {
      margin-top: 40px;
      text-align: center;
      color: #777;
    }
  </style>
</head>

<body>
  <div class="invoice">
    <h1>SMART INVOICE AI</h1>

    <p><strong>Customer:</strong> ${invoice.customer_name}</p>
    <p><strong>Payment Method:</strong> ${invoice.payment_method}</p>

    <table>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>

      ${productRows}
    </table>

    <div class="total">
      <p>Subtotal: ₹${invoice.subtotal}</p>
      <p>GST (${invoice.gst_percent}%): ₹${invoice.gst_amount}</p>
      <h2>Grand Total: ₹${invoice.grand_total}</h2>
    </div>

    <div class="footer">
      Thank you for shopping with us!
    </div>
  </div>
</body>
</html>
`;
}

module.exports = generateInvoiceHTML;