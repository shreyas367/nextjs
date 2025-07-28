"use client";

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast, Toaster } from 'sonner';
import { messageSchema } from '@/schemas/messageSchema';

export default function MessageForm({ username }: { username: string }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = messageSchema.safeParse({ content: message });
    if (!result.success) {
      toast.error("Message must be at least 2 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-message", {
        method: "POST",
        body: JSON.stringify({ username, content: message }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();

      toast.success("Message sent successfully!");
      setMessage("");
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toaster position="top-center" richColors />
      <Textarea
        name="content"
        placeholder="Write your anonymous message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={loading}
        required
      />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
