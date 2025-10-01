export let tickets = [
  { id: 1, subject: "VPN not connecting", description: "Unable to connect to corporate VPN from home network", status: "unresolved", attachments: [], employeeId: 1 },
  { id: 2, subject: "Email sync issue", description: "Outlook is not syncing emails properly", status: "acknowledged", attachments: [], employeeId: 2 },
  { id: 3, subject: "Password reset request", description: "Forgot my login password, need reset", status: "resolved", attachments: [], employeeId: 3 },
  { id: 4, subject: "Laptop screen flickering", description: "Screen flickers randomly when using applications", status: "unresolved", attachments: [], employeeId: 1 },
  { id: 5, subject: "Software installation request", description: "Need MS Project installed on my laptop", status: "acknowledged", attachments: [], employeeId: 2 },
];

// Helper function to add ticket from chatbot
export function addChatbotTicket(subject, description) {
  const newTicket = {
    id: tickets.length + 1,
    subject,
    description,
    status: "unresolved",
    attachments: [],
    employeeId: 1, // or default employee
  };
  tickets = [newTicket, ...tickets]; // add to the top
  return newTicket;
}
