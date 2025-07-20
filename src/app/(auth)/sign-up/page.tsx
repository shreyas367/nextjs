'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useDebounceValue } from 'usehooks-ts'

import { signUpSchema } from '@/schemas/signUpSchema'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type FormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const [username, setUsername] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUsernameTaken, setIsUsernameTaken] = useState(false)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [debouncedUsername] = useDebounceValue(username, 400)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  // 🔍 Real-time check username
  useEffect(() => {
    const checkUsername = async () => {
      if (!debouncedUsername) return
      setCheckingUsername(true)
      try {
        const res = await axios.post('/api/auth/check-username', {
          username: debouncedUsername,
        })
        setIsUsernameTaken(res.data.exists)
      } catch (err) {
        console.error('Username check failed:', err)
      } finally {
        setCheckingUsername(false)
      }
    }

    checkUsername()
  }, [debouncedUsername])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (isUsernameTaken) {
      toast.error('Username is already taken.')
      return
    }

    setIsSubmitting(true)
    try {
      await axios.post('/api/sign-up', data)

      toast.success(
        'Sign Up Successful. Please check your email for verification.'
      )

     router.replace(`/verify/${data.username}`)
     setIsSubmitting(false)


    } catch (error) {
      console.log('Error during sign up:', error)
      const axiosError = error as { response?: { data?: { message?: string } } }
      const errorMessage =
        axiosError.response?.data?.message || 'An unexpected error occurred.'
      toast.error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-2xl font-semibold mb-6">Create Account</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setUsername(e.target.value)
                      }}
                    />
                    
                  </FormControl>
                  <FormDescription>
                    {checkingUsername ? (
                      <span className="text-blue-500">Checking availability...</span>
                    ) : isUsernameTaken ? (
                      <span className="text-red-500">Username is already taken</span>
                    ) : username ? (
                      <span className="text-green-600">Username is available</span>
                    ) : (
                      'This will be your public display name.'
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || checkingUsername || isUsernameTaken}
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
