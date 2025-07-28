"use client";

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { User } from 'next-auth';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user: User = session?.user as User;

  return (
    <nav className='p-4 md:p-6 bg-gray-800 text-white'>
      <div className='container mx-auto flex justify-between items-center'>
        <a href="#">FEEDBACK</a>

        {session ? (
          <>
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.username || user?.email}</span>
              <Button onClick={() => signOut({ callbackUrl: '/sign-in' })}>Logout</Button>
            </div>
          </>
        ) : (
          pathname !== '/sign-in' && (
            <div className="flex items-center gap-4">
              <Link href="/sign-in">
                <Button variant="default">Log In</Button>
              </Link>
              <Link href="/sign-up">
                <Button >Sign Up</Button>
              </Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
}
