import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/server/api/routers/auth/schemas";
import { getUserByEmail } from "@/actions/get-user";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user?.password || !user.email || !user.emailVerified) return null;

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return null;
        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user: as }) {
      const user = await getUserByEmail(token.email);

      if (user) {
        session.user.image = user.image;
        session.user.id = user.id;
      }

      return { ...session };
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
