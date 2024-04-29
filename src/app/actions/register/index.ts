"use server";

import { db } from "@/server/db";
import { TRegisterSchema } from "./type";
import { RegisterSchema } from "./schema";
import bcrypt from "bcryptjs";
import { validateFields } from "@/lib/utils";
import { verificationEmail } from "../send-emails/verification-email";
import { getUserByEmail } from "../get-user";

export async function register(values: TRegisterSchema) {
  const validatedFields = validateFields<TRegisterSchema, typeof RegisterSchema>(
    values,
    RegisterSchema,
  );

  if (!validatedFields) {
    return null;
  }

  const { name, email, password } = validatedFields;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    if (!existingUser.emailVerified) {
      await verificationEmail({
        email,
      });
      return { warning: "Verification email sent" };
    }
    return { error: "User already exists" };
  }

  const saltRounds = 10;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await db.user.create({
      data: {
        name,
        password: hashedPassword,
        email,
      },
    });

    await verificationEmail({
      email,
    });

    return { success: "Verification email sent" };
  } catch (err) {
    console.error(err);
    return null;
  }
}
