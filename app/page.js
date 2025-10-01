"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LandingPage() {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      router.push("/home"); // logged-in users go to home
    } else {
      router.push("/login"); // unauthenticated users go to login
    }
  }, [state.user]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <p className="text-gray-600">Redirecting...</p>
    </div>
  );
}
