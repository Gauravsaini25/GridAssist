"use client";
import { useState } from "react";

export default function TicketCard({ ticket }) {
  const [open, setOpen] = useState(false);

  const statusColor = {
    unresolved: "bg-red-100 text-red-700 border border-red-300",
    acknowledged: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    resolved: "bg-green-100 text-green-700 border border-green-300",
  };

  return (
    <div className="border border-border p-4 rounded-xl shadow-sm hover:shadow-md bg-card transition relative h-35">
      {/* Title + Description */}
      <h2 className="font-semibold text-lg text-foreground">{ticket.subject}</h2>
      <p className="text-muted-foreground text-sm line-clamp-2">
        {ticket.description}
      </p>

      {/* Status + Action */}
      <div className="flex justify-between mt-3 items-center absolute bottom-2 w-[80%]">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor[ticket.status]}`}
        >
          {ticket.status}
        </span>
        <button
          onClick={() => setOpen(true)}
          className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-medium shadow hover:bg-blue-700 transition cursor-pointer"
        >
          View
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-slate-900 border border-border p-6 rounded-xl shadow-2xl w-[90%] max-w-md animate-in fade-in zoom-in-95">
            <h2 className="text-xl font-bold mb-2 text-foreground">
              {ticket.subject}
            </h2>
            <p className="text-muted-foreground mb-3">{ticket.description}</p>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${statusColor[ticket.status]}`}
              >
                {ticket.status}
              </span>
            </p>

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
