"use client"
import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from 'sonner'
import { Message } from '@/model/user'
import axios from 'axios'



type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}



export default function MessageCard({message,onMessageDelete}: MessageCardProps) {
const handleDeleteConfirm = async() => {
 const response= await axios.delete(`/api/delete-message/${message.id}`)
toast.success('Message deleted successfully')
onMessageDelete(message.id)
}
  if (!message) {
    return <div className="text-center text-gray-500">No message found</div>
  }
  if (!message.content) {
    return <div className="text-center text-gray-500">No content available</div>
  }



 
  return (
  <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>

     <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline"><X className='h-5 w-5'/> </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>

  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
  )
}
