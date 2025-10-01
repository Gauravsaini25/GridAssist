"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { admins } from "@/mock/admins";
import { employees } from "@/mock/employees";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const { dispatch } = useAuth();
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!id || !password) return alert("Enter ID and Password");

    if (role === "admin") {
      const admin = admins.find(
        (a) => (a.username === id || a.id === id) && a.password === password
      );
      if (!admin) return alert("Invalid admin credentials");
      dispatch({
        type: "LOGIN",
        payload: { id: admin.id, username: admin.username, role: "admin", name: admin.name },
      });
      router.push("/admin/analytics");
      return;
    }

    const emp = employees.find((e) => e.empId === id || String(e.id) === id);
    if (!emp || emp.password !== password) return alert("Invalid employee credentials");
    dispatch({
      type: "LOGIN",
      payload: { id: emp.id, empId: emp.empId, role: "employee", name: emp.name },
    });
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Role Tabs */}
        <div className="flex">
          {["employee", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={` cursor-pointer flex-1 py-3 font-semibold transition-colors duration-300 ${
                role === r
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Smart Ticketing — Sign In
          </h1>

          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={role === "admin" ? "Admin Username / A100" : "Employee ID (e.g., PG1001)"}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            Admins available: <strong>admin / admin123</strong>, <strong>opslead / ops2025</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
