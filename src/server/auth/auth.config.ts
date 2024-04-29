import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { validateFields } from "@/lib/utils";
import { TLoginSchema } from "@/actions/login/type";
import { LoginSchema } from "@/actions/login/schema";
import { getUserByEmail } from "@/actions/get-user";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = validateFields<TLoginSchema, typeof LoginSchema>(
          credentials as TLoginSchema,
          LoginSchema,
        );
        if (!validatedFields) return null;

        const { email, password } = validatedFields;

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
