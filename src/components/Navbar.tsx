"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {User} from 'next-auth';
import { Button } from '@/components/ui/button';

export default function Navbar() {
    const { data: session } = useSession();

    const user:User= session?.user as User;


  return (
    
    <nav className='p-4 md:p-6 bg-gray-800 text-white flex justify-between items-center'>
    <div className='container mx-auto flex justify-between items-center'>

    <a href="#"> messagee</a>
    {
        session ? (
            <>
            <span> welcome ,{user.username|| user.email}</span>
          <Link href= "/dashboard">
           <Button onClick={() => signOut()}>Logout</Button>
          </Link>
            
        
            </>
        ) : (
            <Link href="/sign-in">
            <Button>Log In </Button>
             </Link>
            
        )
    }
    </div>
    </nav>
  )
}
