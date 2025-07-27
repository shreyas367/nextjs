"use client";
import React, { useCallback, useState } from 'react'; // ✅ fixed import
import { Message } from '@/model/user';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from 'sonner';

import { useSession } from 'next-auth/react'; // ✅ fixed useSession import

import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';

// ❌ Removed unnecessary: import { set } from 'mongoose';

export default function Page() { // ✅ changed 'page' to 'Page' (capital letter)
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession(); // ✅ fixed destructuring

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessage = watch('acceptMessage');

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);

    
    try {
      const response = await fetch('/api/accept-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ acceptMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept message');
      }

      const data = await response.json();
      toast.success('Message accepted successfully');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while accepting the message');
    } finally {
      setIsSwitchLoading(false);
    }
  }, [acceptMessage]); // ✅ added dependency to useCallback

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId));
    toast.success('Message deleted successfully');
  };

  if (!session) {
    return <div className="text-center text-gray-500">Please log in to view messages</div>;
  }

  if (!messages || messages.length === 0) {
    return <div className="text-center text-gray-500">No messages found</div>;
  }

  return (
    <div>
      <h1>shreyas</h1>
    </div>
  );
}
