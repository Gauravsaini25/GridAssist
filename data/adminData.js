export const tickets = [
  { id: 1, employee: "Alice", issue: "Password Reset", status: "Open" },
  { id: 2, employee: "Bob", issue: "VPN not working", status: "Resolved" },
  { id: 3, employee: "Charlie", issue: "Email access", status: "In Progress" },
  { id: 4, employee: "Diana", issue: "Software installation", status: "Open" },
  { id: 5, employee: "Eve", issue: "System crash", status: "Open" },
  { id: 6, employee: "Frank", issue: "Printer not responding", status: "Resolved" },
];

export const employees = [
  { name: "Alice", tickets: 5 },
  { name: "Bob", tickets: 3 },
  { name: "Charlie", tickets: 4 },
  { name: "Diana", tickets: 2 },
  { name: "Eve", tickets: 6 },
];

export const notes = [
  { title: "Weekly Report", content: "Check ticket trends before Friday." },
  { title: "Security", content: "Remind team to reset VPN certificates." },
  { title: "System Upgrade", content: "Schedule downtime for server upgrade." },
  { title: "Feedback", content: "Collect user feedback on new portal." },
];
