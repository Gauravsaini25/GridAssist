"use client";
import { useState } from "react";
import { tickets } from "@/mock/tickets";
import { articles } from "@/mock/articles";
import { addChatbotTicket } from "@/mock/tickets"; // use helper instead

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "👋 Hi! I’m your assistant. How can I help you today?", sender: "bot" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  


  // NEW states for ticket creation
  const [ticketStep, setTicketStep] = useState(null); // null | "subject" | "description"
  const [pendingTicket, setPendingTicket] = useState({ subject: "", description: "" });

  // helper: keyword article search (kept same)
  function findRelevantArticles(query) {
    const words = query.toLowerCase().split(" ").filter((w) => w.length > 2);
    return articles.filter((article) =>
      words.some(
        (word) =>
          article.title.toLowerCase().includes(word)
      )
    );
  }

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    // push user message
    setMessages((prev) => [...prev, { text: `🙋 ${userMessage}`, sender: "user" }]);
    const text = userMessage;            // capture current text
    setUserMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let msg = text.toLowerCase();
      let response = null;

      // --- Ticket creation multi-step flow ---
      if (ticketStep === "subject") {
        // user provided subject -> ask for description
        setPendingTicket((prev) => ({ ...prev, subject: text }));
        setTicketStep("description");
        response = "✍️ Please provide a short description of the issue.";
      } else if (ticketStep === "description") {
        // user provided description -> create ticket
        const newTicket = {
          id: tickets.length + 1,
          subject: pendingTicket.subject || text,
          description: text,
          status: "unresolved",
          attachments: [],
          employeeId: 1,
        };
        tickets.push(newTicket);
        setTicketStep(null);
        setPendingTicket({ subject: "", description: "" });
        response = `✅ Got it! Your issue has been logged.\n🆔 Ticket #${newTicket.id}\n📌 Subject: "${newTicket.subject}"`;
      }
      // user asked to start logging an issue
      else if (msg.includes("issue") || msg.includes("problem") || msg.includes("ticket")) {
        setTicketStep("subject");
        response = "📝 Sure — I can log a ticket. What's the subject (short title) for your issue?";
      }

      // --- Article guidance (UNCHANGED) ---
      else if (
        msg.includes("how") ||
        msg.includes("steps") ||
        msg.includes("guide") ||
        msg.includes("guidance") ||
        msg.includes("help")
      ) {
        const matched = findRelevantArticles(text);
        if (matched.length > 0) {
          response = (
            <div>
              📖 I found {matched.length} article(s) that might help:
              <ul className="list-disc pl-4 mt-2">
                {matched.map((a) => (
                  <li key={a.id}>
                    <a
                      href={`/articles/${a.id}`}
                      className="text-blue-600 underline"
                    >
                      {a.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        } else {
          response = "🤔 Sorry, I couldn’t find any related article. Can you rephrase?";
        }
      }

      // fallback
      else {
        response = "🤖 I didn’t fully get that. Do you want me to log a ticket or guide you?";
      }

      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1200);
  };


  return (
    <div className="flex justify-center items-start mt-10">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 font-semibold">
          💬 Support Bot
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-white h-[400px]">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${m.sender === "user"
                    ? "bg-indigo-200 text-black"
                    : "bg-gray-100 text-black border border-gray-200"
                  }`}
              >
                {typeof m.text === "string" ? m.text : m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-1 text-gray-500">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-200">●</span>
              <span className="animate-bounce delay-400">●</span>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex space-x-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
