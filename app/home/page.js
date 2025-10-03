// home.jsx (or home/page.jsx)
'use client'
import AuthGuard from "@/components/AuthGuard";
import Chatbot from "@/components/Chatbot";
import { tickets } from "@/mock/tickets"; 
import Link from "next/link"; 
import { Ticket } from "lucide-react";
// Removed useState and Menu imports as they are no longer needed here

export default function HomePage() {
  return (
    <AuthGuard>
      <div className="w-full h-[100vh] bg-gradient-to-b from-[#094298] to-[#0F6EFE] dark:from-[#094298] dark:to-[#0F6EFE] flex flex-row">
        
        {/* Side Panel (Ticket List) */}
        <div className="w-1/4 h-full bg-[#081C3A] text-white p-4 flex flex-col">
          
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
             <Ticket className="w-5 h-5" /> Your Active Tickets
          </h2>

          {/* List of Tickets */}
          <div className="flex-grow overflow-y-auto space-y-2 pr-2">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <div 
                  key={ticket.id} 
                  className={`rounded-lg tex-sm transition cursor-default flex flex-row justify-between items-center p-3 hover:bg-[#ffffff53]
                              ${ticket.status === 'unresolved' ? 'bg-red-900/50' : 
                                ticket.status === 'acknowledged' ? 'bg-yellow-900/50' : 
                                'bg-green-900/50'}`}
                >
                  <p className="font-medium truncate text-[#ffffffdf]">{ticket.subject}</p>
                  <p className={`text-xs capitalize
                    ${
                      ticket.status === "unresolved"
                        ? "text-red-400/80"
                        : ticket.status === "acknowledged"
                        ? "text-yellow-400/80"
                        : "text-green-400/80"
                    }`}>
                    {ticket.status}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No tickets found.</p>
            )}
          </div>
          
          {/* Removed the entire Hamburger Menu area */}

        </div>
        
        {/* Chatbot Area */}
        <div className="w-3/4 h-full">
          <Chatbot />
        </div>
      </div>
    </AuthGuard>
  );
}