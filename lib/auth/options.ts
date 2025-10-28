import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { loginSchema } from "@/lib/auth/validators";
import { verifyUserCredentials } from "@/lib/auth/service";
import { prisma } from "@/lib/db/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt" as const
  },
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await verifyUserCredentials(parsed.data.email, parsed.data.password);
        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email
        };
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name ?? undefined;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.sub ?? undefined;
        session.user.email = (token.email as string | undefined) ?? session.user.email;
        session.user.name = (token.name as string | undefined) ?? session.user.name;
      }
      return session;
    }
  }
};
