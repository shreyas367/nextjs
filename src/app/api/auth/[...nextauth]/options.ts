import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/model/user";
import { dbConnect } from "@/lib/dbconnect";



export const authOptions: NextAuthOptions = {
  providers: [
      // 👉 Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 👉 GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
  identifier: { label: "Email or Username", type: "text" },
  password: { label: "Password", type: "password" },
},

      async authorize(credentials: any): Promise<any> {
        await dbConnect();

        try {
        const user = await UserModel.findOne({
  $or: [
    { email: credentials.identifier.toLowerCase() },
    { username: credentials.identifier },
  ]
});


          if (!user) {
            throw new Error("User not found");
          }
          if (!user.isVerified) {
            throw new Error("User not verified");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
             id: user._id,
  email: user.email,
  username: user.username, // ✅ direct match
  isAcceptingMessages: user.isAcceptingMessages,
  isVerified: user.isVerified,
          };
        } catch (error: any) {
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
    return '/dashboard'; // always go here after login
  },







    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username =user.username;
        token.isAcceptingMessagges = user.isAcceptingMessages; // Ensure isAcceptingMessages is set
        token.isVerified = user.isVerified ; // Ensure isVerified is set
      }
      return token;
    },

    async session({ session, token }) {
        if (token) {
            session.user.id = token.id as string;
            session.user.email = token.email as string;
            session.user.username = token.username as string;
            session.user.isAcceptingMessages = token.isAcceptingMessages as boolean; // Ensure isAcceptingMessages is set
            session.user.isVerified = token.isVerified as boolean; // Ensure isVerified is set
        }
      return session;
    },
  },




  pages: {
    signIn: "/sign-in", // Custom sign-in page
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
