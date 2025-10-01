"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }) {
  const { state } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state === null) {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        router.push("/login"); // redirect if not logged in
      }
    }
    setLoading(false);
  }, [state, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
