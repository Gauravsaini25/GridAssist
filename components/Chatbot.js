// Chatbot.jsx
"use client";
import { useState } from "react";
import { tickets } from "@/mock/tickets";
import { articles } from "@/mock/articles";
import { addChatbotTicket } from "@/mock/tickets";
import { ArrowBigUp, ArrowUp, Menu, Newspaper, ListTodo, X } from "lucide-react"; // Added Menu, Home, ListTodo
import TypingBubble from "./TypingBubble";
import Link from "next/link"; // Added Link for navigation

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! I’m your assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // State for the new menu
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // NEW states for ticket creation (kept same)
  const [ticketStep, setTicketStep] = useState(null); // null | "subject" | "description"
  const [pendingTicket, setPendingTicket] = useState({
    subject: "",
    description: "",
  });

  // helper: keyword article search (kept same)
  function findRelevantArticles(query) {
    const words = query
      .toLowerCase()
      .split(" ")
      .filter((w) => w.length > 2);
    return articles.filter((article) =>
      words.some((word) => article.title.toLowerCase().includes(word))
    );
  }

  const sendMessage = () => {
    if (!userMessage.trim()) return;

    // push user message (kept same)
    setMessages((prev) => [
      ...prev,
      { text: `🙋 ${userMessage}`, sender: "user" },
    ]);
    const text = userMessage; // capture current text
    setUserMessage("");
    setIsTyping(true);

    // ... (rest of sendMessage logic is the same)
    setTimeout(() => {
      let msg = text.toLowerCase();
      let response = null;

      // --- Ticket creation multi-step flow ---
      if (ticketStep === "subject") {
        setPendingTicket((prev) => ({ ...prev, subject: text }));
        setTicketStep("description");
        response = "✍️ Please provide a short description of the issue.";
      } else if (ticketStep === "description") {
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
      else if (
        msg.includes("issue") ||
        msg.includes("problem") ||
        msg.includes("ticket")
      ) {
        setTicketStep("subject");
        response =
          "📝 Sure — I can log a ticket. What's the subject (short title) for your issue?";
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
          response =
            "🤔 Sorry, I couldn’t find any related article. Can you rephrase?";
        }
      }

      // fallback
      else {
        response =
          "🤖 I didn’t fully get that. Do you want me to log a ticket or guide you?";
      }

      setMessages((prev) => [...prev, { text: response, sender: "bot" }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex justify-center items-start">
      <div className="w-full h-full flex flex-col overflow-hidden relative">
        
        {/* Header with Hamburger Menu in Top Right */}
        <div className=" text-[#ffffff] p-4 text-4xl font-black relative ">
          GridAssist
          
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            // Positioning the button in the top right corner
            className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full 
                       bg-white/10 backdrop-blur-sm border border-white/20 
                       hover:bg-white/20 transition duration-200 focus:outline-none z-20"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div
              // Positioning the menu directly below and slightly to the left of the button
              className="absolute top-14 right-4 w-48 p-2 rounded-lg shadow-2xl 
                         bg-white/10 backdrop-blur-md border border-white/20 z-10 mt-2"
            >
              {/* Option 1: Link to Home Page (Self) */}
              <Link
                href="/articles"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 text-sm text-white rounded-md hover:bg-white/20 transition"
              >
                <Newspaper className="w-4 h-4" /> View all Articles
              </Link>

              {/* Option 2: Link to Tickets Page */}
              <Link
                href="/tickets"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 text-sm text-white rounded-md hover:bg-white/20 transition"
              >
                <ListTodo className="w-4 h-4" /> View all Tickets
              </Link>
            </div>
          )}
          
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                  m.sender === "user"
                    ? "bg-[#448fff] text-white"
                    : "bg-[#133b77] text-white"
                }`}
              >
                {typeof m.text === "string" ? m.text : m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <TypingBubble/>
          )}
        </div>

        {/* Input */}
        <div className="p-3 flex space-x-2">
          <div className="flex-1 rounded-full bg-[#081C3A] p-3 text-white flex flex-row justify-between">
            <input
              type="text"
              className="h-full w-[90%] focus:outline-none text-white ml-4"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#0E6DFD] hover:bg-[#0e6efdaf] text-white p-2 rounded-full transition"
            >
              <ArrowUp color="#ffffff"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}