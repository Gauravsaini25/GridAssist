"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { admins } from "@/mock/admins";
import { employees } from "@/mock/employees";
import { Icon, LogIn } from "lucide-react";

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
        payload: {
          id: admin.id,
          username: admin.username,
          role: "admin",
          name: admin.name,
        },
      });
      router.push("/admin/analytics");
      return;
    }

    const emp = employees.find((e) => e.empId === id || String(e.id) === id);
    if (!emp || emp.password !== password)
      return alert("Invalid employee credentials");
    dispatch({
      type: "LOGIN",
      payload: {
        id: emp.id,
        empId: emp.empId,
        role: "employee",
        name: emp.name,
      },
    });
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#094298] to-[#0F6EFE] dark:from-[#094298] dark:to-[#0F6EFE] gap-5">
      <div className="bg-[#0F61DD] rounded-2xl w-[20%] overflow-hidden p-2">
        {["employee", "admin"].map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={` cursor-pointer flex-1 w-[50%] py-3 transition-colors duration-300 rounded-xl ${
              role === r
                ? "cursor-pointer items-center bg-white/20 backdrop-blur-sm p-3 border border-white/10  font-bold"
                : "bg-gray-100 dark:bg-inherit text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#00000016]"
            }`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white bg-gradient-to-b p-8 from-[#C5DCFF] to-[#ffffff] dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        <div className="flex justify-center">
          <div className="bg-[#ffffff] rounded-2xl w-[80px] h-[80px] overflow-hidden p-2 shadow-2xl shadow-[#00000016] flex items-center justify-center mb-5">
            <LogIn color="#000000" size={40} />
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleLogin} className=" space-y-4">
          <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-[#000000]">
            Log in to raise a ticket.
          </h1>

          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder={
              role === "admin"
                ? "Admin Username / A100"
                : "Employee ID (e.g., PG1001)"
            }
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-blue-500 dark:bg-[#ACC2E1] dark:text-[#000000]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-blue-500 dark:bg-[#ACC2E1] dark:text-[#000000]"
          />
          <div className="flex justify-end mb-10">
            <p className="text-sm text-gray-500 dark:text-[#0E6DFD] text-right underline">
              Forgot password?
            </p>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full bg-[#0E6DFD] text-white p-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Login
          </button>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            Admins available: <strong>admin / admin123</strong>,{" "}
            <strong>opslead / ops2025</strong>
          </p>
        </form>
      </div>
    </div>
  );
}
