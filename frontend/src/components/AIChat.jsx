import { useState } from "react";
import { FaRobot, FaPaperPlane } from "react-icons/fa";

function AIChat({ invoices }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI() {
    const q = question.toLowerCase();

    if (q.includes("revenue")) {
      const revenue = invoices.reduce(
        (sum, item) => sum + Number(item.total || 0),
        0
      );

      setAnswer(`Your total revenue is ₹${revenue}.`);
    }

    else if (q.includes("pending")) {
      const pending = invoices.filter(
        (item) => item.status === "Pending"
      ).length;

      setAnswer(`You have ${pending} pending invoices.`);
    }

    else if (q.includes("paid")) {
      const paid = invoices.filter(
        (item) => item.status === "Paid"
      ).length;

      setAnswer(`You have ${paid} paid invoices.`);
    }

    else if (q.includes("customer")) {
      if (invoices.length === 0) {
        setAnswer("No customer data found.");
      } else {
        const highest = invoices.reduce((a, b) =>
          Number(a.total) > Number(b.total) ? a : b
        );

        setAnswer(
          `Your highest paying customer is ${highest.customer}.`
        );
      }
    }

    else {
      setAnswer(
        "I couldn't understand that yet. More AI capabilities are coming soon."
      );
    }
  }

  return (
    <div className="card ai-chat">
      <h2>
        <FaRobot /> AI Business Assistant
      </h2>

      <input
        type="text"
        placeholder="Ask something about your business..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <button onClick={askAI}>
        <FaPaperPlane />
        Ask AI
      </button>

      {answer && (
        <div className="ai-answer">
          {answer}
        </div>
      )}
    </div>
  );
}

export default AIChat;