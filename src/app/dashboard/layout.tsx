"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";
import axios from "axios";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState("light");
  const [messages, setMessages] = useState<any[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/sign-in");
    }
  }, [status]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Poll for new messages every 10s
  useEffect(() => {
    if (!session || intervalRef.current) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get("/api/get-messages");
        const newMessages = res.data.message || [];

        if (newMessages.length !== messages.length) {
          setMessages(newMessages);
          toast.success("Dashboard updated with new messages!");
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages(); // Initial fetch
    intervalRef.current = setInterval(fetchMessages, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [session, messages]);

  if (status === "loading") {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0a0a0a] dark:text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-[#111] shadow-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <nav className="space-x-4 hidden md:block">
          <Link href="/dashboard" className="hover:text-blue-500">Home</Link>
          <Link href="/dashboard/messages" className="hover:text-blue-500">Messages</Link>
          <Link href="/dashboard/settings" className="hover:text-blue-500">Settings</Link>
        </nav>
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="ml-4 p-2 rounded-md border dark:border-gray-600"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile nav */}
      <nav className="md:hidden px-6 py-2 space-x-4">
        <Link href="/dashboard" className="hover:text-blue-500">Home</Link>
        <Link href="/dashboard/messages" className="hover:text-blue-500">Messages</Link>
        <Link href="/dashboard/settings" className="hover:text-blue-500">Settings</Link>
      </nav>

      {/* Main content */}
      <motion.main
        className="p-6"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}

        {/* Display Messages */}
        {messages.length > 0 ? (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">Anonymous Messages</h2>
            {messages.map((msg, index) => (
              <div
                key={index}
                className="p-4 border rounded-md dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
              >
                <p>{msg.content}</p>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-gray-500">No messages yet.</p>
        )}
      </motion.main>
    </div>
  );
}
