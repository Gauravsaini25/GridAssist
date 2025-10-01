"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ArticleModal({ open, onClose, suggestion }) {
  const router = useRouter();
  if (!open) return null;

  const handleCreate = () => {
    const params = new URLSearchParams();
    if (suggestion?.title) params.set("title", suggestion.title);
    if (suggestion?.content) params.set("content", suggestion.content);
    router.push(`/admin/create-article?${params.toString()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-[90%] max-w-2xl p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{suggestion?.title}</h2>
            <p className="text-sm text-muted mt-2">{suggestion?.meta || "Suggested article based on ticket trends."}</p>
          </div>
          <button onClick={onClose} className="text-muted cursor-pointer">Close</button>
        </div>

        <div className="mt-4 prose max-w-none text-sm text-foreground" dangerouslySetInnerHTML={{ __html: suggestion?.content || "<p>No preview</p>" }} />

        <div className="flex gap-3 justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-md border cursor-pointer">Cancel</button>
          <button onClick={handleCreate} className="px-4 py-2 rounded-md bg-blue-600 text-white cursor-pointer">Create Article</button>
        </div>
      </motion.div>
    </div>
  );
}
