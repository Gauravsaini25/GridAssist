"use client";
import { useState } from "react";
import TicketCard from "./TicketCard";
// NOTE: useTickets, TicketCard imports are assumed to be resolved.

export default function TicketTabs() {
    // Assuming useTickets is available and provides state
    const state = { tickets: [] }; // Mock state for display purposes
    // const { state } = useTickets();
    
    const [filter, setFilter] = useState("unresolved");
    const [search, setSearch] = useState("");

    const filteredTickets = state.tickets
        .filter(t => t.status === filter)
        .filter(t => t.subject.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="p-4 bg-[#081C3A] rounded-2xl shadow-2xl text-white">
            <div className="flex justify-between mb-6 flex-wrap gap-3">
                {/* Filter Buttons */}
                <div className="flex gap-2">
                    {/* Unresolved Button */}
                    <button 
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition ${filter === "unresolved" ? "bg-red-600 text-white shadow-md" : "bg-white/10 text-gray-300 hover:bg-white/20"}`} 
                        onClick={() => setFilter("unresolved")}
                    >
                        Unresolved
                    </button>
                    {/* Acknowledged Button */}
                    <button 
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition ${filter === "acknowledged" ? "bg-yellow-600 text-white shadow-md" : "bg-white/10 text-gray-300 hover:bg-white/20"}`} 
                        onClick={() => setFilter("acknowledged")}
                    >
                        Acknowledged
                    </button>
                    {/* Resolved Button */}
                    <button 
                        className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition ${filter === "resolved" ? "bg-green-600 text-white shadow-md" : "bg-white/10 text-gray-300 hover:bg-white/20"}`} 
                        onClick={() => setFilter("resolved")}
                    >
                        Resolved
                    </button>
                </div>
                
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    // Using dark navy background and bright blue focus ring
                    className="border border-white/20 rounded-xl px-3 py-2 shadow-inner bg-[#133b77] text-white focus:outline-none focus:ring-2 focus:ring-[#448fff] transition placeholder-gray-400"
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* TicketCard will render here, using its new dark style */}
                {filteredTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
            </div>
        </div>
    );
}