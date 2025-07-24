'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import verifySchema  from '@/schemas/signInSchema'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type SignInFormData = z.infer<typeof verifySchema>

export default function SignInPage() {
  const router = useRouter()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })
 

 const onSubmit = async (data: SignInFormData) => {
  const { identifier, password } = data

  const result = await signIn('credentials', {
    redirect: false,
    email: identifier,
    password,
  })

  if (result?.ok) {
    toast.success('✅ Signed in successfully')
    router.push('/dashboard')
  } else {
    toast.error(result?.error || '❌ Failed to sign in')
  }
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto mt-10">
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
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded">
          Sign In
        </button>
      </form>
    </Form>
  )
}
