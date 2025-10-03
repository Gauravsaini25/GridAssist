"use client";
// MOCK: Replacing external imports with mock implementations to resolve build errors.

const useTickets = () => ({
  state: {
    tickets: [
      // UPDATED Mock ticket data
      // High Priority (Count: 3)
      { id: 1, subject: "VPN Access Issue" },
      { id: 4, subject: "VPN Access Issue" },
      { id: 8, subject: "VPN Access Issue" },

      // Medium Priority (Count: 2)
      { id: 2, subject: "Printer Not Working" },
      { id: 10, subject: "Printer Not Working" },
      { id: 7, subject: "Email Configuration" },
      { id: 9, subject: "Email Configuration" },

      // Low Priority (Count: 1)
      { id: 3, subject: "Password Reset" },
      { id: 5, subject: "Software Installation" },

      // NEW: High Priority (Count: 4)
      { id: 11, subject: "Virtual Desktop Lag" },
      { id: 12, subject: "Virtual Desktop Lag" },
      { id: 13, subject: "Virtual Desktop Lag" },
      { id: 14, subject: "Virtual Desktop Lag" },

      // NEW: Medium Priority (Count: 2)
      { id: 15, subject: "Monitor Connection" },
      { id: 16, subject: "Monitor Connection" },

      // NEW: Low Priority (Count: 1)
      { id: 17, subject: "Time Off Request System" },
    ],
  },
});

const useArticles = () => ({
  state: {
    articles: [
      // Mock article data for testing existence checks
      {
        id: 101,
        title: "How to Reset Your VPN Access",
        content: "<p>The main guide for VPN issues.</p>",
      },
      {
        id: 102,
        title: "Password Management Policy",
        content: "<p>Detailed password procedures.</p>",
      },
      // Article for the new High Priority subject
      {
        id: 103,
        title: "Optimizing Virtual Desktop Performance",
        content: "<p>Steps to fix lag in VDI.</p>",
      },
    ],
  },
});

const ArticleModal = ({ open, onClose, suggestion }) => {
  if (!open || !suggestion) return null;
  return (
    // Simple mock modal UI
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 p-8 rounded-xl max-w-lg w-full text-white shadow-2xl border border-blue-600/50"
      >
        <h3 className="text-xl font-bold mb-4 text-blue-400">
          {suggestion.title}
        </h3>
        <p className="text-sm text-gray-400 border-b border-gray-700 pb-2 mb-4">
          {suggestion.meta}
        </p>
        <div
          className="prose prose-invert max-w-none text-gray-200"
          dangerouslySetInnerHTML={{ __html: suggestion.content }}
        />
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500 transition"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};
// END MOCKS

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, BookOpen } from "lucide-react"; // Added icons for UI

export default function RecommendationsPage() {
  const { state: ticketState } = useTickets();
  const { state: articleState } = useArticles();
  const tickets = ticketState.tickets;

  // Build subject counts
  const subjectCounts = tickets.reduce((acc, t) => {
    acc[t.subject] = (acc[t.subject] || 0) + 1;
    return acc;
  }, {});

  // FIX: Removed slice(0, 8) to show all subjects
  const recurring = Object.entries(subjectCounts).sort((a, b) => b[1] - a[1]);

  const [modalOpen, setModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const openSuggestion = (subject) => {
    // Check for existing article match
    const existing = articleState.articles.find((a) =>
      a.title.toLowerCase().includes(subject.toLowerCase())
    );

    // Default suggested content template
    const suggestedContent = `<p>Suggested article content for: <strong>${subject}</strong></p>
      <p>Summary: Create a clear step-by-step resolution covering common causes and screenshots.</p>
      <h3>Quick Fix Steps</h3>
      <ol>
        <li>Identify the precise problem/error code.</li>
        <li>Verify user credentials and network connectivity.</li>
        <li>Attempt a soft restart of the client application/device.</li>
        <li>If issue persists, escalate to IT Support Tier 2.</li>
      </ol>`;

    // Payload for the modal
    const payload = existing
      ? {
          title: existing.title,
          content: existing.content,
          meta: "Existing Article Found",
        }
      : {
          title: `${subject} - Troubleshooting Guide`,
          content: suggestedContent,
          meta: "NEW Article Recommended",
        };

    setSuggestion(payload);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#081C3A] text-gray-100 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center space-x-4 pb-4 border-b border-gray-700"
        >
          <BookOpen className="w-8 h-8 text-indigo-500" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Knowledge Recommendations
          </h1>
        </motion.div>

        {/* Subtitle/Description */}
        <p className="text-gray-400">
          Analyze recurring ticket subjects below to identify critical gaps in
          your documentation and create new articles instantly.
        </p>

        {/* Recommendation Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recurring.map(([subject, count]) => {
            const existing = articleState.articles.find((a) =>
              a.title.toLowerCase().includes(subject.toLowerCase())
            );
            // Priority Logic: High (> 3 tickets), Medium (2-3 tickets), Low (1 ticket)
            const isHighPriority = count > 3;
            const statusColor = existing
              ? "border-green-500/50 bg-green-900/20"
              : "border-red-500/50 bg-red-900/20";
            const statusText = existing ? "Article Exists" : "Gaps Found";
            const icon = existing ? (
              <BookOpen className="w-5 h-5 text-green-400" />
            ) : (
              <Zap className="w-5 h-5 text-red-400" />
            );

            const priorityLabel = isHighPriority
              ? "HIGH"
              : count > 1
              ? "MEDIUM"
              : "LOW";
            const priorityBg = isHighPriority
              ? "bg-red-600/50"
              : count > 1
              ? "bg-yellow-600/50"
              : "bg-green-600/50";

            return (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-2xl shadow-xl border ${statusColor} bg-gray-800  transition space-y-4`}
              >
                {/* Subject & Count */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {subject}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Tickets:{" "}
                      <span className="font-semibold text-white">{count}</span>
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${priorityBg} text-white`}
                  >
                    {priorityLabel}
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <p
                    className={`flex items-center text-sm font-medium ${
                      existing ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {icon}
                    <span className="ml-1">{statusText}</span>
                  </p>

                  <div className="flex gap-3">
                    {/* Primary Button */}
                    <motion.button
                      onClick={() => openSuggestion(subject)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition shadow-md shadow-indigo-600/30"
                    >
                      {existing ? "Review Article" : "Draft New"}
                    </motion.button>

                    {/* Secondary Link/Button */}
                    {existing && (
                      <a
                        href={`/articles/${existing.id}`}
                        className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 text-sm font-semibold hover:bg-gray-700 transition"
                      >
                        Open Editor
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal */}
        <ArticleModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          suggestion={suggestion}
        />
      </motion.div>
    </div>
  );
}
