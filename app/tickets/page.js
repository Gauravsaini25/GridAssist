'use client'
import AuthGuard from "@/components/AuthGuard";
import TicketCard from "@/components/TicketCard";
import { useState } from "react";
import { tickets as mockTickets } from "@/mock/tickets";
import { Search } from "lucide-react";

export default function TicketsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTickets = mockTickets.filter(ticket =>
    (filter === "all" || ticket.status === filter) &&
    (ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AuthGuard>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
          Your Tickets
        </h1>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          {/* Filters */}
         <div className="flex gap-2 flex-wrap">
  {[
    { key: "all", label: "All", active: "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white" },
    { key: "unresolved", label: "Unresolved", active: "bg-red-600 text-white" },
    { key: "acknowledged", label: "Acknowledged", active: "bg-yellow-500 text-white" },
    { key: "resolved", label: "Resolved", active: "bg-green-600 text-white" },
  ].map(({ key, label, active }) => (
    <button
      key={key}
      onClick={() => setFilter(key)}
      className={`px-4 py-2 cursor-pointer rounded-full text-sm font-medium cursor-pointer transition border ${
        filter === key
          ? active
          : "bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  ))}
</div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-border bg-white dark:bg-slate-800 dark:text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
            />
          </div>
        </div>

        {/* Ticket Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
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
