"use client";
import { useState, useEffect } from "react";
import { useArticles } from "@/context/ArticlesContext";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CreateArticlePage() {
  const { state, dispatch } = useArticles();
  const search = useSearchParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const t = search.get("title");
    const c = search.get("content");
    if (t) setTitle(t);
    if (c) setContent(c);
    if (!description && t) setDescription(t + " — quick guide");
  }, [search]);

  const handlePublish = () => {
    if (!title || !content) return alert("Title and content required");
    const newArticle = {
      id: Date.now(),
      title,
      description: description || title,
      content,
      image: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=600&q=80",
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_ARTICLE", payload: newArticle });
    alert("Article published!");
    router.push(`/articles/${newArticle.id}`);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Create & Publish Article</h1>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article title" className="w-full p-3 rounded-md border" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="w-full p-3 rounded-md border" />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} placeholder="Article HTML content (you can include <p>, <ol>, <h2> etc.)" className="w-full p-3 rounded-md border" />

        <div className="flex gap-3 justify-end">
          <button onClick={() => router.back()} className="px-4 py-2 border rounded-md cursor-pointer">Cancel</button>
          <button onClick={handlePublish} className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer">Publish</button>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-semibold mb-2">Preview</h2>
        <div className="prose max-w-none p-6 bg-white dark:bg-slate-800 rounded-xl shadow" dangerouslySetInnerHTML={{ __html: content || "<p>No content yet</p>" }} />
      </div>
    </motion.div>
  );
}
