"use client";
import { useState } from "react";
import { sendContactEmail } from "../actions/sendContactEmail";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("Sending...");
    const res = await sendContactEmail(formData);

    if (res?.success) setStatus("✅ Message sent successfully!");
    else setStatus("❌ Failed to send message. Try again later.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Info Panel */}
        <div className="bg-blue-600 dark:bg-blue-800 text-white p-8 space-y-6">
          <h2 className="text-3xl font-bold">Contact Music Academy</h2>
          <p className="text-blue-100">
            Have questions about our courses or events? Reach out and we'll help you out.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>support@musicacademy.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5" />
              <span>Delhi, India</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
          <form action={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition duration-200"
            >
              Send Message
            </button>
            {status && (
              <p className="text-center text-sm text-blue-600 dark:text-blue-300 mt-2">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
