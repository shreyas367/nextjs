import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import UserModel from '@/model/user'
import { dbConnect } from '@/lib/dbconnect'
import type { NextAuthOptions } from 'next-auth'

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
      async authorize(credentials) {
        if (!credentials) throw new Error('No credentials provided')

        const { identifier, password } = credentials
        await dbConnect()

        const user = await UserModel.findOne({
          $or: [{ email: identifier.toLowerCase() }, { username: identifier }],
        })

        if (!user) throw new Error('User not found')
        if (!user.isVerified) throw new Error('Account not verified')

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw new Error('Incorrect password')

        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          isVerified: user.isVerified,
          isAcceptingMessages: user.isAcceptingMessages,
        }
      },
    }),
  ],

  pages: {
    signIn: '/sign-in',
    // error: '/auth/error', // optional
  },

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.isVerified = user.isVerified
        token.isAcceptingMessages = user.isAcceptingMessages
      }
      return token
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
        session.user.isVerified = token.isVerified as boolean
        session.user.isAcceptingMessages = token.isAcceptingMessages as boolean
      }
      return session
    },

    async redirect({ url, baseUrl }) {
      return baseUrl + '/dashboard'
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
