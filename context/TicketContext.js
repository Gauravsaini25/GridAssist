"use client";
import { createContext, useContext, useReducer } from "react";

const TicketContext = createContext();

const initialTickets = [
  { id: 1, subject: "Password Reset", description: "Forgot password", status: "resolved", employeeId: "PG1001", createdAt: "2025-09-15T09:10:00Z", resolvedAt: "2025-09-15T09:40:00Z" },
  { id: 2, subject: "Email not working", description: "Outlook not syncing", status: "in-progress", employeeId: "PG1002", createdAt: "2025-09-16T10:00:00Z" },
  { id: 3, subject: "VPN Connectivity", description: "Cannot connect to VPN", status: "resolved", employeeId: "PG1003", createdAt: "2025-09-16T11:20:00Z", resolvedAt: "2025-09-16T12:10:00Z" },
  { id: 4, subject: "Printer issue", description: "Printer offline", status: "open", employeeId: "PG1001", createdAt: "2025-09-17T08:30:00Z" },
  { id: 5, subject: "Slow Laptop", description: "System lagging", status: "in-progress", employeeId: "PG1004", createdAt: "2025-09-17T14:00:00Z" },
  { id: 6, subject: "Software Installation", description: "Need MS Project", status: "resolved", employeeId: "PG1002", createdAt: "2025-09-18T09:00:00Z", resolvedAt: "2025-09-18T10:00:00Z" },
  { id: 7, subject: "Password Reset", description: "Locked out after attempts", status: "open", employeeId: "PG1005", createdAt: "2025-09-18T16:20:00Z" },
  { id: 8, subject: "Email not working", description: "Delayed emails", status: "resolved", employeeId: "PG1006", createdAt: "2025-09-19T09:30:00Z", resolvedAt: "2025-09-19T11:00:00Z" },
  { id: 9, subject: "Password Reset", description: "OTP not arriving", status: "in-progress", employeeId: "PG1007", createdAt: "2025-09-20T07:45:00Z" },
  { id: 10, subject: "Slow Laptop", description: "High CPU usage", status: "open", employeeId: "PG1008", createdAt: "2025-09-21T12:10:00Z" },
  { id: 11, subject: "VPN Connectivity", description: "Intermittent disconnects", status: "in-progress", employeeId: "PG1003", createdAt: "2025-09-22T09:40:00Z" },
  { id: 12, subject: "Software Installation", description: "Install Slack", status: "open", employeeId: "PG1009", createdAt: "2025-09-22T15:00:00Z" },
  { id: 13, subject: "Screen flicker", description: "Laptop screen flickers randomly", status: "resolved", employeeId: "PG1001", createdAt: "2025-09-23T10:00:00Z", resolvedAt: "2025-09-23T13:20:00Z" },
  { id: 14, subject: "Email not working", description: "Attachment fails", status: "open", employeeId: "PG1010", createdAt: "2025-09-24T08:20:00Z" },
  { id: 15, subject: "Password Reset", description: "Admin reset requested", status: "resolved", employeeId: "PG1002", createdAt: "2025-09-25T09:00:00Z", resolvedAt: "2025-09-25T09:15:00Z" },
];

function ticketReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return { ...state, tickets: [action.payload, ...state.tickets] };
    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };
    default:
      return state;
  }
}

export function TicketProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, { tickets: initialTickets });

  const addTicket = (subject, description, employeeId = "PG9999") => {
    const newTicket = {
      id: state.tickets.length + 1,
      subject,
      description,
      status: "open",
      employeeId,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: "ADD_TICKET", payload: newTicket });
    return newTicket;
  };

  const createChatbotTicket = (subject, description) => {
    return addTicket(subject, description, "CHATBOT");
  };

  return (
    <TicketContext.Provider value={{ tickets: state.tickets, addTicket, createChatbotTicket }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}