import { useState } from "react";
import Tesseract from "tesseract.js";

function ReceiptScanner({ onTextExtracted }) {
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  async function handleImageUpload(e) {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setLoading(true);

      const result = await Tesseract.recognize(file, "eng");

      const text = result.data.text;

      setExtractedText(text);
      onTextExtracted(text);
    } catch (error) {
      console.error(error);
      alert("Failed to scan receipt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card receipt-scanner">
      <h2>📷 AI Receipt Scanner</h2>

      <label className="upload-box">
        {loading ? "Scanning receipt..." : "Upload Receipt Image"}
        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
      </label>

      {extractedText && (
        <div className="ocr-result">
          <h3>Extracted Text</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
}

export default ReceiptScanner;