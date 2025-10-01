"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { articles } from "@/mock/articles";

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-muted">Article not found...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/articles">
          <button className="cursor-pointer px-4 py-2 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 text-white font-medium transition-all duration-300">
            ← Back to Articles
          </button>
        </Link>
      </div>

      {/* Article Card */}
      <div className="bg-white/5 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-gray-200/10">
        
        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-tight">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-8">
          <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full">IT Support</span>
          <span>•</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        {/* Featured Image */}
        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Article Content */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Divider */}
        <div className="my-12 border-t border-gray-700/50"></div>

        {/* Call to Action / Footer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p className="text-gray-400 text-lg">
            🚀 Need more help? Reach out to our{" "}
            <span className="text-indigo-400 font-semibold">IT Support Desk</span>.
          </p>

          {/* Redirect button to home */}
          <Link href="/">
            <button className="cursor-pointer px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Raise a Ticket
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
