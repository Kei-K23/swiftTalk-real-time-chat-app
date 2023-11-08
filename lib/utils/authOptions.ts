import { AuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      httpOptions: {
        timeout: 40000,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      httpOptions: {
        timeout: 40000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          placeholder: "e.g foo@example.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "e.g foo123",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        const res = await fetch(
          `http://localhost:3000/api/users?email=${email}&password=${password}`,
          {
            method: "GET",
          }
        );
        const data = await res.json();
        if (res.ok && data) {
          return data.data;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};
