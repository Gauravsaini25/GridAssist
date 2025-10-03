export let tickets = [
  { id: 1, subject: "VPN not connecting", description: "Unable to connect to corporate VPN from home network", status: "unresolved", attachments: [], employeeId: 1 },
  { id: 2, subject: "Email sync issue", description: "Outlook is not syncing emails properly", status: "acknowledged", attachments: [], employeeId: 2 },
  { id: 3, subject: "Password reset request", description: "Forgot my login password, need reset", status: "resolved", attachments: [], employeeId: 3 },
  { id: 4, subject: "Laptop screen flickering", description: "Screen flickers randomly when using applications", status: "unresolved", attachments: [], employeeId: 1 },
  { id: 5, subject: "Software installation request", description: "Need MS Project installed on my laptop", status: "acknowledged", attachments: [], employeeId: 2 },
  { id: 6, subject: "Printer offline", description: "The office printer is showing an offline status, cannot print any documents.", status: "unresolved", attachments: [], employeeId: 4 },
  { id: 7, subject: "Access denied to shared drive", description: "Getting 'Access Denied' error when trying to open the Marketing shared folder (M:).", status: "acknowledged", attachments: [], employeeId: 5 },
  { id: 8, subject: "New hire desk setup complete", description: "Request to confirm setup of desk, monitor, and docking station for John Doe.", status: "resolved", attachments: [], employeeId: 6 },
  { id: 9, subject: "Slow Internet Speed in Office", description: "Network performance is extremely slow today, impacting video calls and large file transfers.", status: "unresolved", attachments: [], employeeId: 7 },
  { id: 10, subject: "Monitor Stand Broken", description: "The adjustable stand on my primary monitor broke this morning; it needs replacement.", status: "acknowledged", attachments: [], employeeId: 8 },
  { id: 11, subject: "Application X License Renewal", description: "License for the 'Data Analytics Pro' software expired and access is blocked.", status: "resolved", attachments: [], employeeId: 9 },
  { id: 12, subject: "Keyboard not responding", description: "My external USB keyboard suddenly stopped working. I've tried unplugging and replugging it.", status: "unresolved", attachments: [], employeeId: 10 },
  { id: 13, subject: "Zoom meeting connection dropping", description: "Frequent disconnections during all Zoom meetings for the past two days.", status: "acknowledged", attachments: [], employeeId: 11 },
  { id: 14, subject: "Mobile phone setup for email", description: "Need assistance setting up corporate email on my new personal Android phone.", status: "resolved", attachments: [], employeeId: 12 },
  { id: 15, subject: "Request for higher capacity laptop", description: "Current laptop specs (8GB RAM) are insufficient for running resource-intensive design software.", status: "unresolved", attachments: [], employeeId: 13 },
  { id: 16, subject: "Slack notification failure", description: "Slack desktop app is not pushing notifications when messages are received.", status: "acknowledged", attachments: [], employeeId: 14 },
  { id: 17, subject: "Two-Factor Authentication Setup", description: "I replaced my phone and need to re-enroll my number for 2FA.", status: "resolved", attachments: [], employeeId: 15 },
  { id: 18, subject: "Corrupted file on desktop", description: "A critical project document on my desktop shows a corrupted icon and cannot be opened.", status: "unresolved", attachments: [], employeeId: 16 },
  { id: 19, subject: "Time tracking software glitch", description: "The time tracking app freezes when trying to submit my weekly hours.", status: "acknowledged", attachments: [], employeeId: 17 },
  { id: 20, subject: "Conference room A/V fixed", description: "The HDMI connection issue in Conference Room A has been resolved.", status: "resolved", attachments: [], employeeId: 18 },
  { id: 21, subject: "Headset microphone static", description: "My company-issued headset microphone has a loud static noise during calls.", status: "unresolved", attachments: [], employeeId: 19 },
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
