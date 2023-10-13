import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text", placeholder: "phone" },
        password: { label: "Password", type: "password" },
        orgNumber: { label: "OrgNumber", type: "number" },
      },
      async authorize(credentials) {
        const user = {
          id: "1",
          name: "Deepak VishWakarma",
          phone: "8766203976",
          password: "1234",
          otp: false,
          profile: true,
        };

        if (
          credentials?.phone == user.phone &&
          credentials.password == user.password
        ) {
          return user;
        } else {
          throw new Error(`Wrong Credentials`);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
