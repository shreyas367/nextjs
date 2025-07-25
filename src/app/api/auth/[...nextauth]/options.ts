import NextAuth from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import UserModel from '@/model/user'
import { dbConnect } from '@/lib/dbconnect'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email or Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
     async authorize(credentials, req) {
  if (!credentials) {
    throw new Error('No credentials provided')
  }

  const { identifier, password } = credentials

  await dbConnect()

  try {
    const user = await UserModel.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier },
      ],
    })

    if (!user) throw new Error('User not found')
    if (!user.isVerified) throw new Error('User not verified')

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw new Error('Invalid password')

    return {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      isAcceptingMessages: user.isAcceptingMessages,
      isVerified: user.isVerified,
    }
  } catch (error: any) {
    throw new Error(error.message || 'Login failed')
  }
}

    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.username = user.username
        token.isAcceptingMessages = user.isAcceptingMessages
        token.isVerified = user.isVerified
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.username = token.username as string
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean
        session.user.isVerified = token.isVerified as boolean
      }
      return session
    },

    async redirect() {
      return '/dashboard';
    },
  },

  pages: {
    signIn: '/sign-in',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
