"use client";
// 💡 FIX: Added explicit import for React to resolve "React is not defined" error
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { articles } from "@/mock/articles";
import { ChevronLeft } from "lucide-react";
// Safely import the parser library
import parse from "html-react-parser";

// 💡 Refactored HtmlContent to use the 'replace' option for safe styling
const HtmlContent = ({ htmlString }) => {
  const options = {
    replace: (node) => {
      if (node.type !== "tag") return;

      // Apply styling based on tag type
      switch (node.name) {
        case "h2":
          node.attribs.className =
            "text-3xl font-bold mt-8 mb-4 border-b border-white/20 pb-2 text-[#C5DCFF]";
          break;
        case "h3":
          node.attribs.className =
            "text-xl font-semibold mt-6 mb-3 text-[#0E6DFD]";
          break;
        case "p":
          node.attribs.className = "mb-5 leading-relaxed";
          break;
        case "ul":
          node.attribs.className = "list-disc list-inside ml-4 mb-5 space-y-2";
          break;
        case "li":
          node.attribs.className = "text-gray-300";
          break;
        case "blockquote":
          node.attribs.className =
            "border-l-4 border-[#0E6DFD] pl-4 py-2 my-6 bg-black/20 italic text-gray-300";
          break;
        case "strong":
        case "b":
          node.attribs.className = "font-extrabold text-white";
          break;
        default:
          return; // Do nothing for other tags
      }
    },
  };

  return parse(htmlString, options);
};

export default function ArticlePage() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#081C3A] text-gray-400">
        <p className="text-xl">Article not found...</p>{" "}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto text-white ">
      {/* Back Button */}
      <Link href="/articles">
        <button className="cursor-pointer gap-2 flex flex-row items-center bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/10 m-5 hover:bg-[#0E6DFD]/30">
          <ChevronLeft className="w-5 h-5" /> Back to Articles
        </button>
      </Link>
      {/* Article Card - Styled for dark theme */}{" "}
      <div className="bg-[#093570] backdrop-blur-md rounded-3xl shadow-2xl p-8 lg:p-12 border border-white/10">
        {/* Title */}
        <div className="mb-8 justify-between space-y-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md tracking-tight justify-between">
            {article.title}
          </h1>
          {/* Meta Info */}
          <div className="gap-2 flex flex-row  text-sm text-[#C5DCFF] border-b border-white/10 pb-4 ">
            <span className="px-3 py-1 bg-[#0E6DFD]/20 text-[#0E6DFD] font-semibold rounded-full text-xs uppercase tracking-wider">
              IT Support
            </span>
            <span>Published: {new Date().toLocaleDateString()}</span>{" "}
          </div>
          {/* Featured Image */}
          <div className="mb-10 overflow-hidden rounded-2xl shadow-xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        {/* SAFE Article Content Rendering */}
        <div className="text-gray-200">
          <HtmlContent htmlString={article.content} />
        </div>
        {/* Divider */}
        <div className="my-12 border-t border-white/10"></div>
        {/* Call to Action / Footer */}
        <div className="flex flex-row items-center justify-between ">
          <p className="text-[#C5DCFF] text-lg">
            🚀 Need more help? Reach out to our{" "}
            <span className="text-[#0E6DFD] font-bold">IT Support Desk</span>.
          </p>
          {/* Redirect button to home - Styled with the blue gradient */}{" "}
          <Link href="/">
            <button className="cursor-pointer gap-2 flex flex-row items-center bg-white/10 backdrop-blur-sm rounded-full p-3 border border-white/10 m-5 hover:bg-[#0E6DFD]/30">
              Raise a New Ticket
            </button>
          </Link>
        </div>{" "}
      </div>{" "}
    </div>
  );
}
