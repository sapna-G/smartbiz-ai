import { useState } from "react";
import { askBusinessCopilot } from "../services/api";

const quickQuestions = [
  "How much revenue did I make?",
  "Who is my top customer?",
  "How many pending invoices?",
  "Give me one business suggestion.",
];

function BusinessChat({ invoices }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askAI(customQuestion = question) {
    if (!customQuestion.trim()) {
      alert("Please ask a question.");
      return;
    }

    try {
      setLoading(true);
      setAnswer("");

      const data = await askBusinessCopilot(customQuestion, invoices);

      if (data.success) {
        setAnswer(data.answer);
      } else {
        setAnswer("Could not get answer from AI.");
      }
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card business-chat">
      <h2>🤖 AI Business Copilot</h2>

      <div className="quick-question-row">
        {quickQuestions.map((q) => (
          <button
            key={q}
            onClick={() => {
              setQuestion(q);
              askAI(q);
            }}
            className="quick-question"
          >
            {q}
          </button>
        ))}
      </div>

      <input
        placeholder="Ask: What should I improve in my business?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={() => askAI()} disabled={loading}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && <p className="chat-answer">{answer}</p>}
    </div>
  );
}

export default BusinessChat;