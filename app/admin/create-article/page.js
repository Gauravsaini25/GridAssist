"use client";
import { useState, useEffect } from "react";
import { useArticles } from "@/context/ArticlesContext";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FilePenLine, Eye, X, CheckCircle, AlertTriangle } from "lucide-react";

// Helper component for in-app notifications (replaces alert())
const Notification = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-600" : "bg-red-600";
  const Icon = type === "success" ? CheckCircle : AlertTriangle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-xl text-white shadow-xl ${bgColor}`}
    >
      <Icon className="w-5 h-5 mr-2" />
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default function CreateArticlePage() {
  // Using mock hooks here to ensure compilation
  const { dispatch } = useArticles();
  const search = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Only attempt to read search params if running client-side
    if (typeof window !== "undefined") {
      const t = search.get("title");
      const c = search.get("content");
      if (t) setTitle(t);
      if (c) setContent(c);
      if (!description && t) setDescription(t + " — quick guide");
    }
  }, [search, description]);

  const handlePublish = () => {
    if (!title || !content) {
      setNotification({
        message: "Title and content required to publish.",
        type: "error",
      });
      return;
    }

    const newArticle = {
      id: Date.now(),
      title,
      description: description || title,
      content,
      // Placeholder image URL
      image:
        "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    };

    // Dispatching the action (using the mock dispatch)
    dispatch({ type: "ADD_ARTICLE", payload: newArticle });

    setNotification({
      message: "Article successfully published!",
      type: "success",
    });

    // Delay navigation slightly so the user can see the success message
    setTimeout(() => {
      router.push(`/articles/${newArticle.id}`);
    }, 1500);
  };

  const handleCloseNotification = () => setNotification(null);

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-[#081C3A] text-gray-100 p-4 md:p-8 relative w-full">
      <AnimatePresence>
        {notification && (
          <Notification {...notification} onClose={handleCloseNotification} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-10"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4 pb-4 border-b border-gray-700"
        >
          <FilePenLine className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Create & Publish Knowledge Article
          </h1>
        </motion.div>

        <div className="flex flex-row justify-between gap-8">
        {/* Article Editor Card */}
          <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl shadow-blue-900/50 border border-blue-700/50 space-y-6 w-1/2">
            <h2 className="text-xl font-semibold text-blue-400 mb-4">
              Article Details
            </h2>

            {/* Title Input */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article Title (e.g., How to Reset Your VPN Credentials)"
              className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner"
            />

            {/* Description Input */}
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short Description/Summary"
              className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner"
            />

            {/* Content Textarea */}
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
              placeholder="Enter article content here. Use standard HTML tags like <h2>, <p>, <ul>, <strong> for formatting."
              className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition shadow-inner font-mono text-sm"
            />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-500 text-gray-300 rounded-xl cursor-pointer hover:bg-gray-700 transition transform hover:scale-[1.02] active:scale-[0.98] font-medium"
              >
                Cancel
              </button>
              <motion.button
                onClick={handlePublish}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-500 transition font-bold shadow-lg shadow-blue-500/50"
              >
                Publish Article
              </motion.button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-800 p-8 rounded-3xl shadow-2xl shadow-blue-900/50 border border-blue-700/50 space-y-6 w-1/2">
            <div className="pt-8 border-t border-gray-800/50 h-full">
              <motion.h2
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="flex items-center font-bold text-2xl mb-4 text-blue-300"
              >
                <Eye className="w-6 h-6 mr-2" />
                Live Preview
              </motion.h2>

              {/* Preview Output */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="p-8 bg-gray-700 rounded-3xl border border-gray-700/50 h-[90%] shadow-inner"
              >
                <div
                  // Using prose for readable HTML rendering, adjusted for dark theme
                  className="prose prose-invert max-w-none text-gray-100"
                  dangerouslySetInnerHTML={{
                    __html:
                      content ||
                      "<p class='text-gray-400 italic'>Type content above to see the live preview appear here...</p>",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
