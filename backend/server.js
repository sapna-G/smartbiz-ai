
const cors = require("cors");
const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const generateInvoiceHTML = require("./invoiceTemplate");

dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://6a47c5497dcdd775ce6c766d--sapna-smartbiz-ai.netlify.app",
      "https://sapna-smartbiz-ai.netlify.app",
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.get("/", (req, res) => {
  res.send("Smart Invoice AI backend is running");
});

app.post("/generate-invoice", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
You are SmartInvoice AI for shops and small businesses.

Extract invoice details from the user's message.

Return ONLY valid JSON.

Format:
{
  "customer_name": "",
  "products": [
    {
      "name": "",
      "quantity": 0,
      "unit_price": 0,
      "total": 0
    }
  ],
  "subtotal": 0,
  "gst_percent": 0,
  "gst_amount": 0,
  "grand_total": 0,
  "payment_method": ""
}

Rules:
- Return only JSON.
- Do not use markdown.
- Do not explain anything.
- Calculate all totals.
- If GST is missing, use 0.

User Message:
${message}
`;

    const result = await model.generateContent(prompt);
    const cleaned = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    const invoice = JSON.parse(cleaned);
    const html = generateInvoiceHTML(invoice);

    res.json({ success: true, invoice, html });
  } catch (error) {
    console.error("FULL ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/receipt-to-invoice", async (req, res) => {
  try {
    const { receiptText } = req.body;

    if (!receiptText) {
      return res.status(400).json({ success: false, error: "Receipt text is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    const prompt = `
You are an AI receipt-to-invoice converter.

Convert this OCR receipt text into valid invoice JSON.

Receipt Text:
${receiptText}

Return ONLY valid JSON in this format:
{
  "customer_name": "Walk-in Customer",
  "products": [
    {
      "name": "",
      "quantity": 1,
      "unit_price": 0,
      "total": 0
    }
  ],
  "subtotal": 0,
  "gst_percent": 0,
  "gst_amount": 0,
  "grand_total": 0,
  "payment_method": "Unknown"
}

Rules:
- Return only JSON.
- No markdown.
- If customer name is missing, use "Walk-in Customer".
- If quantity is missing, use 1.
- Calculate totals correctly.
- If GST is missing, use 0.
`;

    const result = await model.generateContent(prompt);
    const cleaned = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();

    const invoice = JSON.parse(cleaned);
    const html = generateInvoiceHTML(invoice);

    res.json({ success: true, invoice, html });
  } catch (error) {
    console.error("RECEIPT ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post("/generate-pdf", async (req, res) => {
  try {
    const { html } = req.body;

    if (!html) {
      return res.status(400).json({ success: false, error: "HTML is required" });
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=invoice.pdf",
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error("PDF ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/business-copilot", async (req, res) => {
  try {
    const { question, invoices } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        error: "Question is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `
You are an AI business assistant for a small business owner.

Analyze this invoice data and answer the user's question clearly.

Invoice Data:
${JSON.stringify(invoices, null, 2)}

User Question:
${question}

Rules:
- Give a short, useful answer.
- Use numbers if available.
- If data is missing, say what is missing.
- Give one practical suggestion when useful.
`;

    const result = await model.generateContent(prompt);

    res.json({
      success: true,
      answer: result.response.text(),
    });
  } catch (error) {
    console.error("COPILOT ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

