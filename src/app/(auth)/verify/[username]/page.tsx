'use client'

import React from 'react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { verifySchema } from '@/schemas/verifySchema'
import axios from 'axios'
import { toast } from 'sonner'

type VerifyFormData = z.infer<typeof verifySchema>

export default function VerifyAccount() {
  const router = useRouter()
  const { username } = useParams<{ username: string }>()  // case-sensitive

  const form = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: VerifyFormData) => {
    try {
      await axios.post('/api/auth/verify', {
        username: username,
        code: data.code,
      })

      toast.success('Account verified successfully!')
      router.replace('/auth/sign-in')
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Failed to verify account. Please try again.')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the code you received" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">
            Verify
          </button>
        </form>
      </Form>
    </div>
  )
}
