import { useState } from "react";
import {
  FaMicrophone,
  FaStop,
  FaBolt,
  FaTrash,
  FaMagic,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const templates = [
  {
    title: "Retail",
    text:
      "Create invoice for Rahul Sharma. He bought 2 notebooks at ₹85 each and 3 pens at ₹20 each. GST is 18%. Payment by UPI.",
  },
  {
    title: "Electronics",
    text:
      "Create invoice for Priya Verma. She bought 1 wireless mouse at ₹899 and 1 keyboard at ₹2499. GST is 18%. Payment by Card.",
  },
  {
    title: "Restaurant",
    text:
      "Create invoice for Amit Shah. Items: 2 Paneer Butter Masala at ₹320 each, 4 Butter Naan at ₹60 each and 2 Cold Drinks at ₹50 each. GST is 5%. Payment by Cash.",
  },
];

function InvoiceForm({ onGenerate, loading }) {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);

  function handleSubmit() {
    if (!message.trim()) {
      alert("Please enter invoice details.");
      return;
    }

    onGenerate(message);
  }

  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice input is supported only in Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setMessage((prev) => `${prev} ${text}`.trim());

      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
      alert("Could not recognize voice.");
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  return (
    <div className="invoice-studio card">

      {/* Header */}

      <div className="invoice-studio-header">

        <div className="studio-icon">
          <FaFileInvoiceDollar />
        </div>

        <div>

          <h2>AI Invoice Studio</h2>

          <p>Create beautiful invoices using natural language.</p>

        </div>

      </div>

      {/* Templates */}

      <div className="template-row">

        {templates.map((template) => (

          <button
            key={template.title}
            className="template-chip"
            type="button"
            onClick={() => setMessage(template.text)}
          >
            <FaBolt />
            {template.title}
          </button>

        ))}

      </div>

      {/* Text Area */}

      <textarea
        rows="10"
        placeholder={`Describe your invoice...

Example:

Rahul Sharma bought

2 notebooks at ₹85 each

3 pens at ₹20 each

GST is 18%

Payment by UPI`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      {/* AI Suggestions */}

      <div className="ai-suggestions">

        <h4>
          <FaMagic /> AI Suggestions
        </h4>

        <div className="suggestion-chips">

          <button
            type="button"
            onClick={() =>
              setMessage((m) => `${m} GST is 18%.`)
            }
          >
            GST 18%
          </button>

          <button
            type="button"
            onClick={() =>
              setMessage((m) => `${m} Payment by UPI.`)
            }
          >
            UPI
          </button>

          <button
            type="button"
            onClick={() =>
              setMessage((m) => `${m} Payment by Cash.`)
            }
          >
            Cash
          </button>

          <button
            type="button"
            onClick={() =>
              setMessage((m) => `${m} Payment by Card.`)
            }
          >
            Card
          </button>

          <button
            type="button"
            onClick={() =>
              setMessage((m) => `${m} Payment by Net Banking.`)
            }
          >
            Net Banking
          </button>

        </div>

      </div>

      {/* Buttons */}

      <div className="form-actions">

        <button
          className="clear-btn"
          type="button"
          onClick={() => setMessage("")}
        >
          <FaTrash />
          Clear
        </button>

        <button
          className="voice-btn"
          type="button"
          onClick={startVoiceInput}
        >
          {listening ? <FaStop /> : <FaMicrophone />}

          {listening ? "Listening..." : "Voice"}
        </button>

        <button
          className="generate-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          <FaMagic />

          {loading ? "Generating..." : "Generate Invoice"}
        </button>

      </div>

    </div>
  );
}

export default InvoiceForm;