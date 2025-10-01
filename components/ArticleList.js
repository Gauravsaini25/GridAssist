"use client";
import { useState } from "react";
import { articles as mockArticles } from "@/mock/articles";
import Link from "next/link";
import { Search } from "lucide-react";

export default function ArticleList() {
  const [query, setQuery] = useState("");
  const filtered = mockArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-slate-800 dark:text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
        />
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group"
            >
              <div className="card overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition transform cursor-pointer h-[380px] flex flex-col rounded-xl">
                {/* Image */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition"
                />

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-lg font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Short preview */}
                  <p className="text-muted text-sm line-clamp-4 flex-1">
                    {article.description}...
                  </p>

                  {/* Read More */}
                  <span className="mt-3 text-sm font-medium text-primary group-hover:underline cursor-pointer">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-muted text-center col-span-full">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
}
