import React from 'react'

import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import { useState   } from 'react'
import { useDebounceValue } from 'usehooks-ts'
// Update the import path below to the correct relative path if needed
// Update the import path below to the correct relative path if needed
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function page() {
 const [username, setUsername] = React.useState('')
 const [usernameMessage, setUsernameMessage] = React.useState('')
 const [isCheckingUsername, setIsCheckingUsername] = React.useState(false)
 const[isSubmitting, setIsSubmitting] = React.useState(false)

 
 const debouncedUsername = useDebounceValue(username, 200)
const router = useRouter();


// zod implementation
const form= useForm({
  resolver: zodResolver(
    z.object({
      username: z.string().min(3, 'Username must be at least 3 characters long').max(20, 'Username must be at most 20 characters long'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
  ),
  defaultValues: {
    username: '',
    email: '',
    password: '',
  },
})

const onSubmit =async (data:z.infer<typeof signUpSchema>) => {

  
}











 
 
  return (
    <div>
      page
    </div>
  )
}
