"use client";
import AuthGuard from "@/components/AuthGuard";
import ArticleList from "@/components/ArticleList";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

// Mock Link and AuthGuard components to ensure the code block runs independently
const Link = ({ href, children, ...props }) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export default function ArticlesPage() {
  const router = useRouter();
  const { state, dispatch } = useAuth();
  return (
    <AuthGuard>
      {/* Applying the established background gradient */}
      <div className="min-h-screen bg-[#081C3A] text-white">
        {/* Header Section - Sticky, glassy style */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-[#094298] to-[#0f6ffe00] px-8 py-6 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-row justify-between items-center">
            <button
              onClick={state.user.role === "admin" ? () => router.push("/admin/analytics") : () => router.push("/home")}
              className="cursor-pointer gap-1 flex flex-row items-center bg-white/10 backdrop-blur-sm rounded-full  p-3 border border-white/10 hover:bg-[#0E6DFD]/30"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
              Knowledge Base
            </h1>
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition-all duration-300"
            >
              Logout
            </button>
            {/* <div className="w-20 hidden md:block" /> Spacer for symmetry */}
          </div>
        </div>

        {/* Article Content - ArticleList handles the search and grid */}
        <ArticleList />
      </div>
    </AuthGuard>
  );
}
