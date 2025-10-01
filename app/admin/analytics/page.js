"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
    BarChart, Bar
} from "recharts";
import Link from "next/link";

// Dummy data imports (store them in /data/*.js files)
import { tickets, notes, employees } from "@/data/adminData";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");

    // Analytics dummy data
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
        <div className="p-6 space-y-8">
            {/* Header */}
            <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-4">
                {["overview", "tickets", "employees", "notes"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl shadow font-medium transition-colors duration-300 cursor-pointer
        ${activeTab === tab
                                ? "bg-indigo-500 text-white"       // selected tab
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200" // unselected tab
                            }
      `}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>


            {/* Tab Content */}
            {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-xl font-semibold mb-4  text-gray-700">Top Recurring Issues</h2>
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
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Line Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg  text-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Tickets Over Time</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={ticketsOverTime}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="tickets" stroke="#6366F1" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {activeTab === "tickets" && (
                <div className="bg-white p-6 rounded-2xl shadow-lg  text-gray-700">
                    <h2 className="text-xl font-semibold mb-4">All Tickets</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="p-3 border">ID</th>
                                    <th className="p-3 border">Employee</th>
                                    <th className="p-3 border">Issue</th>
                                    <th className="p-3 border">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((t) => (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="p-3 border">{t.id}</td>
                                        <td className="p-3 border">{t.employee}</td>
                                        <td className="p-3 border">{t.issue}</td>
                                        <td className="p-3 border">{t.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "employees" && (
                <div className="bg-white p-6 rounded-2xl shadow-lg  text-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Tickets by Employee</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={employees}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="tickets" fill="#10B981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {activeTab === "notes" && (
                <div className="bg-white p-6 rounded-2xl shadow-lg  text-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Admin Notes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {notes.map((note, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-4 rounded-xl shadow"
                            >
                                <h3 className="font-bold text-lg mb-2">{note.title}</h3>
                                <p className="text-gray-700">{note.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
