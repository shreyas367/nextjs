"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Message, User } from '@/model/user';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast, Toaster } from 'sonner';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema';
import axios from 'axios';
import { ApiResponse } from '@/types/ApiResponse';
import { Switch } from '@/components/ui/switch';

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

  // Fetch toggle state
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await fetch('/api/accept-messages');
      const data = await response.json();
      setValue('acceptMessage', data.isAcceptingMessage);
      toast.success('Fetched acceptMessage successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error fetching accept message');
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

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

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  // Toggle switch handler
  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post('/api/accept-messages', {
        acceptMessage: !acceptMessage,
      });
      setValue('acceptMessage', response.data.isAcceptingMessage);
      toast.success('Switch updated');
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.message || 'Error toggling switch');
    } finally {
      setIsSwitchLoading(false);
    }
  };

  // Delete message and refresh
  const handleDeleteMessage = async (messageId: string) => {
    try {
      await axios.delete(`/api/delete-message/${messageId}`); // Ensure this API exists
      toast.success('Message deleted successfully');
      fetchMessages(true); // auto-refresh
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete message');
    }
  };

  const user = session?.user as User | undefined;
  const username = user?.username;

  const baseUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}`
    : '';
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Profile URL copied to clipboard");
  };

  if (!session || !session.user) {
    return <div>Please login</div>;
  }

  return (
    <div className="p-6 space-y-6 dark:bg-black dark:text-white min-h-screen">
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          classNames: {
            toast: 'transition-transform duration-300',
          },
        }}
      />

      <h1 className="text-2xl font-bold">Welcome, {username}</h1>

      {/* Profile URL Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Profile URL</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {profileUrl}
          </a>
          <Button onClick={copyToClipboard}>Copy URL</Button>
        </CardContent>
      </Card>

      {/* Accept Messages Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Accepting Messages</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Switch
            checked={acceptMessage}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span>{acceptMessage ? "Enabled" : "Disabled"}</span>
        </CardContent>
      </Card>

      {/* Messages Display */}
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : messages.length === 0 ? (
            <p>No messages yet.</p>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="border p-2 rounded flex justify-between items-center"
              >
                <p>{message.content}</p>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteMessage(message.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
