"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { HomeIcon, ClipboardIcon, DocumentIcon, ChartBarIcon, BookOpenIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const { state, dispatch } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (!state.user) return null;
  if (state.user.role === "employee") return null;

  const isAdmin = state.user.role === "admin";

  const links = isAdmin
    ? [
        { href: "/admin/analytics", label: "Analytics", icon: ChartBarIcon },
        { href: "/admin/recommendations", label: "Recommendations", icon: BookOpenIcon },
        { href: "/admin/create-article", label: "Publish Article", icon: PlusCircleIcon },
      ]
    : [
        { href: "/home", label: "Home", icon: HomeIcon },
        { href: "/tickets", label: "Tickets", icon: ClipboardIcon },
        { href: "/articles", label: "Articles", icon: DocumentIcon },
      ];

  return (
    <nav className="bg-gradient-to-b to-[#081C3A] from-[#0f6ffe00] backdrop-blur-sm sticky top-0 z-50">
      <div className=" mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-2xl font-extrabold bg-blue-600 bg-clip-text text-transparent select-none">
            GridAssist
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-300 
                  ${active 
                    ? "bg-blue-600 text-white shadow-lg" 
                    : "text-gray-700 dark:text-gray-300 bg-[#0e2c5a] hover:bg-gray-100 dark:hover:bg-blue-900 hover:text-primary"
                  }`}
              >
                <Icon className={`w-5 h-5 ${active ? "text-white" : ""}`} />
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={() => {
              dispatch({ type: "LOGOUT" });
              router.push("/login");
            }}
            className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium shadow-md transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
