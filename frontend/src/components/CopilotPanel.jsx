import { useState } from "react";
import { FaArrowRight, FaMicrophone, FaPaperclip } from "react-icons/fa";
import { askBusinessCopilot } from "../services/api";

function CopilotPanel({ invoices }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    try {
      setLoading(true);
      const data = await askBusinessCopilot(question, invoices);
      setAnswer(data.success ? data.answer : "Could not get answer.");
    } catch {
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="copilot-panel">
      <div>
        <p className="copilot-label">AI Copilot</p>
        <h2>What can I help you with today?</h2>
      </div>

      <div className="copilot-input">
        <button><FaMicrophone /></button>
        <input
          placeholder="Ask anything about your business..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button><FaPaperclip /></button>
        <button onClick={askAI}>
          {loading ? "..." : <FaArrowRight />}
        </button>
      </div>

      {answer && <div className="copilot-answer">{answer}</div>}
    </section>
  );
}

export default CopilotPanel;