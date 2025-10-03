"use client";
import { useState } from "react";
import { articles as mockArticles } from "@/mock/articles";
import Link from "next/link";
import { Search } from "lucide-react";

export default function ArticleList() {
  const [query, setQuery] = useState("");
  
  // Assuming mockArticles is an array available via import
  const articles = Array.isArray(mockArticles) ? mockArticles : [];
  
  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 pt-0 max-w-7xl mx-auto">
      {/* Search Input - Styled for the dark/translucent theme */}
      <div className="relative mb-8 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Search knowledge base articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          // Dark, translucent style with blue focus ring
          className="w-full pl-10 pr-3 py-3 rounded-full bg-black/50 backdrop-blur-sm text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-[#0E6DFD] transition placeholder-gray-400"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Articles Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.id}`}
              className="group block"
            >
              <div 
                  className="bg-[#133b77] border border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-2xl h-full flex flex-col"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x200/081C3A/C5DCFF?text=Article"; }}
                    />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 text-white">
                  <h2 
                      className="text-xl font-bold mb-2 text-[#C5DCFF] line-clamp-2"
                  >
                    {article.title}
                  </h2>

                  {/* Short preview */}
                  <p className="text-gray-300 text-sm line-clamp-4 flex-1">
                    {article.description}...
                  </p>

                  {/* Read More */}
                  <div className="mt-4 pt-3 border-t border-white/10">
                        <span 
                            className="text-sm font-medium text-[#0E6DFD] group-hover:underline transition cursor-pointer flex items-center gap-1"
                        >
                            Read Article →
                        </span>
                    </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full py-10 italic">
            No articles found.
          </p>
        )}
      </div>
    </div>
  );
}