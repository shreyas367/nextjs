import NextAuth from "next-auth";


declare module "next-auth" {
    interface User {
        id: string;
        email: string;
        name?: string;
        isVerified?: boolean;
        verifyCode?: boolean;
        username?: string;
        isAcceptingMessages?: boolean;
    }
}