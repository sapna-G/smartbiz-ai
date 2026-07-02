import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { generateInvoice } from "../services/api";

function Home() {
  const [invoice, setInvoice] = useState(null);
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [invoiceHistory, setInvoiceHistory] = useState([]);

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  const [company, setCompany] = useState({
    name: "",
    gst: "",
    phone: "",
    email: "",
    address: "",
    logo: null,
  });

  useEffect(() => {
    const savedCompany = localStorage.getItem("company");
    const savedHistory = localStorage.getItem("invoiceHistory");

    if (savedCompany) setCompany(JSON.parse(savedCompany));
    if (savedHistory) setInvoiceHistory(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem("company", JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    localStorage.setItem("invoiceHistory", JSON.stringify(invoiceHistory));
  }, [invoiceHistory]);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function updateProductsFromInvoice(invoiceData) {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];

      invoiceData.products.forEach((item) => {
        const existing = updatedProducts.find(
          (p) => p.name.toLowerCase() === item.name.toLowerCase()
        );

        if (existing) {
          existing.stock = Math.max(
            0,
            Number(existing.stock) - Number(item.quantity)
          );

          existing.sales = (existing.sales || 0) + Number(item.quantity);
        } else {
          updatedProducts.push({
            id: Date.now() + Math.random(),
            name: item.name,
            category: "General",
            price: item.unit_price,
            stock: 100 - Number(item.quantity),
            sales: Number(item.quantity),
          });
        }
      });

      return updatedProducts;
    });
  }

  function saveInvoiceToHistory(invoiceData, htmlData) {
    const newInvoice = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      customer: invoiceData.customer_name,
      total: invoiceData.grand_total,
      payment: invoiceData.payment_method,
      status: "Pending",
      invoice: invoiceData,
      html: htmlData,
    };

    setInvoiceHistory((prev) => [newInvoice, ...prev]);
    updateProductsFromInvoice(invoiceData);
  }

  async function handleGenerate(message) {
    try {
      setLoading(true);

      const data = await generateInvoice(message);

      setInvoice(data.invoice);
      setHtml(data.html);
      saveInvoiceToHistory(data.invoice, data.html);
    } catch (error) {
      console.error(error);
      alert("Failed to generate invoice.");
    } finally {
      setLoading(false);
    }
  }

  function handleReceiptInvoice(invoiceData, htmlData) {
    setInvoice(invoiceData);
    setHtml(htmlData);
    saveInvoiceToHistory(invoiceData, htmlData);
  }

  function openSavedInvoice(item) {
    setInvoice(item.invoice);
    setHtml(item.html);
  }

  function deleteInvoice(id) {
    const confirmed = confirm("Are you sure you want to delete this invoice?");
    if (!confirmed) return;

    setInvoiceHistory((prev) => prev.filter((item) => item.id !== id));
  }

  function updateInvoiceStatus(id, newStatus) {
    setInvoiceHistory((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  }

  return (
    <Dashboard
      invoice={invoice}
      html={html}
      company={company}
      setCompany={setCompany}
      loading={loading}
      handleGenerate={handleGenerate}
      settingsOpen={settingsOpen}
      setSettingsOpen={setSettingsOpen}
      invoiceHistory={invoiceHistory}
      openSavedInvoice={openSavedInvoice}
      deleteInvoice={deleteInvoice}
      updateInvoiceStatus={updateInvoiceStatus}
      handleReceiptInvoice={handleReceiptInvoice}
      products={products}
      setProducts={setProducts}
    />
  );
}

export default Home;