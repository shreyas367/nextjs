"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/sign-in");
    }
  }, [status]);

  // Example auto-refresh every 30 seconds (can be used in children)
  useEffect(() => {
    const interval = setInterval(() => {
      toast.info("Refreshing data...");
      // Trigger a fetch or mutation here if needed
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (status === "loading") {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <motion.div
      className="min-h-screen bg-white text-black dark:bg-[#0a0a0a] dark:text-white"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Toaster richColors position="top-center" />

      {/* Top Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{session?.user?.name}</span>
          {/* Add profile dropdown, theme toggle, etc. */}
        </div>
      </header>

      {/* Main Content with responsive padding */}
      <main className="p-4 md:p-6 lg:p-8">{children}</main>
    </motion.div>
  );
}