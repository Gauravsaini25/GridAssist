"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import Link from "next/link";
// Importing icons for the tabs
import { TrendingUp, Users, NotepadText, Ticket } from "lucide-react";

// Dummy data imports (store them in /data/*.js files)
import { tickets, notes, employees } from "@/data/adminData";

// Updated COLORS for the dark theme
const COLORS = ["#0E6DFD", "#10B981", "#F59E0B", "#EF4444", "#C5DCFF"];

// Data for tabs with icons
const TABS = [
  { id: "overview", name: "Overview", icon: TrendingUp },
  { id: "tickets", name: "Tickets", icon: Ticket },
  { id: "employees", name: "Employees", icon: Users },
  { id: "notes", name: "Notes", icon: NotepadText },
];

// Helper component for status badges - added back for visual enhancement
const StatusBadge = ({ status }) => {
  const baseStyle =
    "px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider";
  switch (status) {
    case "Open":
      return (
        <span className={`${baseStyle} bg-red-600/20 text-red-400`}>
          {status}
        </span>
      );
    case "In Progress":
      return (
        <span className={`${baseStyle} bg-yellow-600/20 text-yellow-400`}>
          {status}
        </span>
      );
    case "Resolved":
      return (
        <span className={`${baseStyle} bg-green-600/20 text-green-400`}>
          {status}
        </span>
      );
    default:
      return (
        <span className={`${baseStyle} bg-gray-600/20 text-gray-400`}>
          {status}
        </span>
      );
  }
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview"); // Analytics dummy data

  const issuesData = [
    { name: "Password Reset", value: 12 },
    { name: "VPN Issue", value: 8 },
    { name: "Email Access", value: 6 },
    { name: "Software Install", value: 4 },
    { name: "Other", value: 3 },
  ];

  const ticketsOverTime = [
    { date: "2025-09-01", tickets: 3 },
    { date: "2025-09-05", tickets: 6 },
    { date: "2025-09-10", tickets: 4 },
    { date: "2025-09-15", tickets: 8 },
    { date: "2025-09-20", tickets: 10 },
  ];

  return (
    <div className=" space-y-4 min-h-screen bg-[#081C3A] text-white px-6">
      {/* Applied dark background and text */} {/* Header */}
      <motion.div
        className="flex justify-between items-center p-6 border-b border-white/10" /* Added border for separation */
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-[#C5DCFF]">
          IT Support Admin Panel
        </h1>
        {/* Updated text style */}
        {/* Re-added the Link for consistency with the dark theme example */}
        <Link
          href="/articles"
          className="text-sm text-[#0E6DFD] hover:text-white transition-colors duration-300 font-medium"
        >
          View Knowledge Base →
        </Link>
      </motion.div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-6 p-6">
        {/* Adjusted gap and flex-wrap */}
        {TABS.map(
          (
            { id, name, icon: Icon } // Using the TABS array with icons
          ) => (
            <motion.button
              key={id}
              onClick={() => setActiveTab(id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border font-medium transition-all duration-300 cursor-pointer
 ${
   activeTab === id
     ? "bg-[#0E6DFD]/50 border-[#0E6DFD] text-white shadow-lg shadow-[#0E6DFD]/30 backdrop-blur-sm" // selected tab
     : "bg-white/10 border-white/10 text-[#C5DCFF] hover:bg-white/20 backdrop-blur-sm" // unselected tab
 }
 `}
            >
              <Icon className="w-5 h-5" /> {/* Icon component */}
              {name}
            </motion.button>
          )
        )}
      </div>
      {/* Tab Content */}
      {activeTab === "overview" && (
        <motion.div
          className="flex flex-row justify-between "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pie Chart */}
          <div className="bg-[#093570]/70 p-6 rounded-2xl shadow-xl border border-white/10 w-[49%]">
            {/* Dark background, shadow, border */}
            <h2 className="text-xl font-semibold mb-4 text-[#C5DCFF]">
              Top Recurring Issues
            </h2>
            {/* Light text color */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={issuesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {issuesData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #0E6DFD",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                {/* Dark tooltip style */}
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Line Chart */}
          <div className="bg-[#093570]/70 p-6 rounded-2xl shadow-xl border border-white/10 w-[49%]">
            {/* Dark background, shadow, border */}
            <h2 className="text-xl font-semibold mb-4 text-[#C5DCFF]">
              Tickets Over Time
            </h2>
            {/* Light text color */}
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ticketsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                <XAxis dataKey="date" stroke="#C5DCFF" />
                <YAxis stroke="#C5DCFF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#081C3A",
                    border: "1px solid #0E6DFD",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                {ticketsOverTime.length > 0 && (
                  <Legend
                    wrapperStyle={{ color: "#C5DCFF" }}
                    payload={[
                      {
                        value: "Tickets",
                        type: "line",
                        color: "#0E6DFD",
                        id: "tickets",
                      },
                    ]}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#0E6DFD"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
      {activeTab === "tickets" && (
        <motion.div
          className="bg-[#093570]/70 p-6 rounded-2xl shadow-xl border border-white/10 "
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#C5DCFF]">
            All Active Tickets
          </h2>
          {/* Light text color */}
          <div className="overflow-x-auto rounded-lg border border-white/10">
            {/* Added border to table container */}
            <table className="min-w-full text-left">
              {/* Removed generic border */}
              <thead className="bg-[#0E6DFD]/10 text-[#C5DCFF] uppercase text-xs tracking-wider">
                {/* Darker header, light text */}
                <tr>
                  <th className="p-4 border-b border-white/10">ID</th>
                  {/* Specific border styling */}
                  <th className="p-4 border-b border-white/10">Employee</th>
                  <th className="p-4 border-b border-white/10">Issue</th>
                  <th className="p-4 border-b border-white/10">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr
                    key={t.id}
                    className="hover:bg-white/5 transition-colors duration-200"
                  >
                    {/* Hover effect */}
                    <td className="p-4 border-b border-white/10 text-gray-400">
                      {t.id}
                    </td>
                    <td className="p-4 border-b border-white/10 text-white">
                      {t.employee}
                    </td>
                    <td className="p-4 border-b border-white/10 text-gray-300">
                      {t.issue}
                    </td>
                    <td className="p-4 border-b border-white/10">
                      <StatusBadge status={t.status} />
                      {/* Using the StatusBadge component */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
      {activeTab === "employees" && (
        <motion.div
          className="bg-[#093570]/70 p-6 rounded-2xl shadow-xl border border-white/10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-[#C5DCFF]">
            Tickets by Employee
          </h2>
          {/* Light text color */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={employees}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
              {/* Light grid lines */}
              <XAxis dataKey="name" stroke="#C5DCFF" /> {/* Light axis text */}
              <YAxis stroke="#C5DCFF" />
              {/* Light axis text */}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#081C3A",
                  border: "1px solid #0E6DFD",
                  borderRadius: "8px",
                  color: "white",
                }}
              />
              {/* Dark tooltip style */}
              <Bar dataKey="tickets" fill="#10B981" radius={[10, 10, 0, 0]} />
              {/* Green bars, added radius */}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}
      {activeTab === "notes" && (
        <motion.div
          className="bg-[#093570]/70 p-6 rounded-2xl shadow-xl border border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-[#C5DCFF]">
            Admin Notes & Reminders
          </h2>
          {/* Light text color */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {notes.map((note, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-[#0e6efd4d] p-5 rounded-xl shadow-lg border border-white/10 cursor-pointer" // Dark gradient, shadow, border
              >
                <h3 className="font-bold text-lg mb-2 text-[#0e6efd]">
                  {note.title}
                </h3>
                {/* Blue title */}
                <p className="text-gray-300">{note.content}</p>
                {/* Light gray content */}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
