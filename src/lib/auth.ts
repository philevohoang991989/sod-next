import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const auth: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        otp: { label: "otp", type: "text", placeholder: "otp" },
      },
      async authorize(credentials) {
        try {
          // Call your API to validate credentials
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}Authentication/otp/valid?otp=${credentials?.otp}`
          );

          if (response && response.data) {
            const user = response.data;
            console.log({ user });
            return Promise.resolve(user);
          } else {
            // Handle authentication failure
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log({ callbacksuser: user });
      if (user) {
        return {
          ...user,
          token: user.token,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        token: token.token,
      };
    },
  },
};

export default auth;
