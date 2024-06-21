import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User{
    token: string | null
  }
  interface Session {
    user: User & {
        token: string
    }
    token: string
  }
}