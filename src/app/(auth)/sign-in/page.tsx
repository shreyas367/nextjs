'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import verifySchema from '@/schemas/signInSchema'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'

type SignInFormData = z.infer<typeof verifySchema>

export default function SignInPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<SignInFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true)

    const result = await signIn('credentials', {
      redirect: false, // prevents automatic redirection
      identifier: data.identifier,
      password: data.password,
     
    })

    setLoading(false)
    console.log("Sign-in result:", result)
    if (!result) {
      toast.error('Sign-in failed')
      return
    }

    if (result?.ok) {
      toast.success('Signed in successfully')
      router.push(result.url || '/dashboard') // fallback to /dashboard
    } else {
      toast.error(result?.error || 'Sign-in failed')
    }
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-md bg-white p-8 shadow-xl rounded-xl"
        >
          <h1 className="text-2xl font-bold text-center">Welcome Back</h1>

          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email or Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter email or username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white transition ${
              loading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-black hover:bg-gray-900'
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </Form>
    </motion.div>
  )
}
