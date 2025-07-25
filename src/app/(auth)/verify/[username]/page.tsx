'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { verifySchema } from '@/schemas/verifySchema'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

type VerifyFormData = z.infer<typeof verifySchema>

export default function VerifyAccount() {
  const router = useRouter()
  const { username } = useParams<{ username: string }>()

  const form = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
  })

  const onSubmit = async (data: VerifyFormData) => {
    try {
      const response = await axios.post('/api/verify-code', {
        username: decodeURIComponent(username),
        code: data.code,
      })

      if (response.data.success) {
        toast.success('✅ Account verified successfully!')
        router.replace('/sign-in')
      } else {
        toast.error(response.data.message || 'Verification failed.')
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to verify account.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto mt-10">
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
        <button type="submit" className="w-full py-2 px-4 bg-black text-white rounded">
          Verify
        </button>
      </form>
    </Form>
  )
}
