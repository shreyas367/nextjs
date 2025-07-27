import NextAuth from "next-auth";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { getServerSession } from "next-auth/next"; // ✅ for App Router



import { NextRequest } from "next/server";





