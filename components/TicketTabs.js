"use client";
import { useTickets } from "@/context/TicketContext";
import TicketCard from "./TicketCard";
import { useState } from "react";

export default function TicketTabs() {
    const { state } = useTickets();
    const [filter, setFilter] = useState("unresolved");
    const [search, setSearch] = useState("");

    const filteredTickets = state.tickets
        .filter(t => t.status === filter)
        .filter(t => t.subject.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div className="flex justify-between mb-6 flex-wrap gap-3">
                <div className="flex gap-2">
                    <button className={`cursor-pointer px-4 py-2 rounded-full ${filter === "unresolved" ? "bg-red-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("unresolved")}>Unresolved</button>
                    <button className={`cursor-pointer px-4 py-2 rounded-full ${filter === "acknowledged" ? "bg-yellow-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("acknowledged")}>Acknowledged</button>
                    <button className={`cursor-pointer px-4 py-2 rounded-full ${filter === "resolved" ? "bg-green-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("resolved")}>Resolved</button>
                </div>
                <input
                    type="text"
                    placeholder="Search tickets..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded-lg px-3 py-2 shadow-sm focus:outline-blue-500"
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
            </div>
        </div>
    );
}
