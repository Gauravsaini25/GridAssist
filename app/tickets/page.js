"use client";
import AuthGuard from "@/components/AuthGuard";
import TicketCard from "@/components/TicketCard";
import { useState } from "react";
import { tickets as mockTickets } from "@/mock/tickets";
import { Search, Menu, X, Home, ListTodo, Plus, Newspaper } from "lucide-react";
import { Link } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const router = useRouter();

  const filteredTickets = mockTickets.filter(
    (ticket) =>
      (filter === "all" || ticket.status === filter) &&
      (ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
        ticket.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AuthGuard>
      <div className="w-full mx-auto bg-[#081C3A]">
        {/* Page Title */}
        <div className="sticky top-0 z-10 bg-gradient-to-b from-[#094298] to-[#0f6ffe00] p-5 backdrop-blur-xs">
          <div className=" flex flex-row justify-between">
            <h1 className="text-4xl font-extrabold mb-4 text-white">
              Your Tickets
            </h1>
            <div className="flex flex-row h-[100%] gap-2 items-center">
              <button
                className="bg-black/50 backdrop-blur-sm h-full p-2 px-3 rounded-full hover:bg-white/30 transition cursor-pointer flex flex-row items-center gap-2"
                onClick={() => {
                  window.location.href = "/articles";
                }}
              >
                <Newspaper className="text-white w-5 h-5" /> Veiw Articles
              </button>
              <button
                className="backdrop-blur-sm bg-white/20 border h-full border-white/20 p-2 px-3 rounded-full hover:bg-white/30 transition cursor-pointer flex flex-row items-center gap-2"
                onClick={() => {
                  window.location.href = "/home";
                }}
              >
                <Plus className="text-white w-5 h-5" /> Raise new Ticket
              </button>
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="cursor-pointer px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {[
                {
                  key: "all",
                  label: "All",
                  active: "bg-[#0E6DFD]/50 text-white backdrop-blur-sm",
                },
                {
                  key: "unresolved",
                  label: "Unresolved",
                  active: "bg-red-600/50 text-white backdrop-blur-sm",
                },
                {
                  key: "acknowledged",
                  label: "Acknowledged",
                  active: "bg-yellow-500/50 text-white backdrop-blur-sm",
                },
                {
                  key: "resolved",
                  label: "Resolved",
                  active: "bg-green-600/50 text-white backdrop-blur-sm",
                },
              ].map(({ key, label, active }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium transition ${
                    filter === key ? active : "bg-black/50 backdrop-blur-sm"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-1/5">
              <input
                type="text"
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-full bg-black/50 backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Ticket Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 p-5">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))
          ) : (
            <p className="text-muted text-center col-span-full">
              No tickets found.
            </p>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
