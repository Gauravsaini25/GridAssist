"use client";
import { useTickets } from "@/context/TicketContext";
import { useArticles } from "@/context/ArticlesContext";
import { useState } from "react";
import ArticleModal from "@/components/ArticleModal";
import { motion } from "framer-motion";

export default function RecommendationsPage() {
  const { state: ticketState } = useTickets();
  const { state: articleState } = useArticles();
  const tickets = ticketState.tickets;

  // Build subject counts
  const subjectCounts = tickets.reduce((acc, t) => {
    acc[t.subject] = (acc[t.subject] || 0) + 1;
    return acc;
  }, {});
  const recurring = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const [modalOpen, setModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const openSuggestion = (subject) => {
    const existing = articleState.articles.find((a) => a.title.toLowerCase().includes(subject.toLowerCase()));
    const suggestedContent = `<p>Suggested article for: <strong>${subject}</strong></p>
      <p>Summary: create a step-by-step resolution covering common causes and screenshots.</p>
      <h3>Steps</h3>
      <ol><li>Identify problem</li><li>Verify credentials & network</li><li>Restart client</li><li>Contact IT Support</li></ol>`;
    const payload = existing
      ? { title: existing.title, content: existing.content, meta: "Matches existing article." }
      : { title: `${subject} - Troubleshooting`, content: suggestedContent, meta: "Auto-suggested article (no exact match found)." };

    setSuggestion(payload);
    setModalOpen(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">📚 Knowledge Recommendations</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {recurring.map(([subject, count]) => {
          const existing = articleState.articles.find((a) => a.title.toLowerCase().includes(subject.toLowerCase()));
          return (
            <div key={subject} className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{subject}</h3>
                  <p className="text-sm text-muted">Tickets: {count}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={() => openSuggestion(subject)} className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm cursor-pointer">View</button>
                  {!existing && <button onClick={() => openSuggestion(subject)} className="px-3 py-1 rounded-md border text-sm cursor-pointer">Create</button>}
                  {existing && <a href={`/articles/${existing.id}`} className="px-3 py-1 rounded-md border text-sm cursor-pointer">Open</a>}
                </div>
              </div>

              <p className="mt-3 text-sm text-muted">Suggestion: {existing ? "Related article exists" : "No article — recommended to publish"}</p>
            </div>
          );
        })}
      </div>

      <ArticleModal open={modalOpen} onClose={() => setModalOpen(false)} suggestion={suggestion} />
    </motion.div>
  );
}
