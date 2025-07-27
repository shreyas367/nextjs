"use client";
import React, { useCallback, useEffect, useState } from 'react';
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
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessage = watch('acceptMessage');

  // Fetch accept-message toggle state
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await fetch('/api/accept-message');
      const data = await response.json();
      setValue('acceptMessage', data.isAcceptingMessage);
      toast.success('Fetched acceptMessage successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error fetching accept message');
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // Delete a message from list
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message.id !== messageId));
    toast.success('Message deleted successfully');
  };

  // Fetch messages
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/get-messages");
      setMessages(response.data.messages || []);
      if (refresh) {
        toast.success("Showing latest messages");
      }
    } catch (error: any) {
      toast.error(error.message || 'Error fetching messages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  // Handle switch change
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post('/api/accept-message', {
        acceptMessage: !acceptMessage,
      });
      setValue('acceptMessage', response.data.isAcceptingMessage);
      toast.success('Switch updated');
      toast.success(response.data.message); // ✅ Fixed this line
    }
    
    catch (error: any) {
      toast.error(error.message || 'Error toggling switch');
    } finally {
      setIsSwitchLoading(false);
    }
  };

  if (!session || !session.user) {
    return <div>please login</div>;
  }

  return (
    <div>
      <h1>shreyas</h1>
    </div>
  );
}
