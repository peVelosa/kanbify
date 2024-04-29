"use server";

import { LoginSchema } from "./schema";
import { TLoginSchema } from "./type";
import { validateFields } from "@/lib/utils";
import bcrypt from "bcryptjs";
import { signIn } from "@/server/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "../get-user";

export const login = async (values: TLoginSchema) => {
  const validatedFields = validateFields<TLoginSchema, typeof LoginSchema>(values, LoginSchema);
  if (!validatedFields) return { error: "Invalid credentials!" };

  const { email, password } = validatedFields;

  const user = await getUserByEmail(email);

  if (!user || !user?.password || !user.email) return { error: "User not found" };

  const isVerified = user?.emailVerified;
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return { error: "Invalid credentials!" };
  }

  if (!isVerified) {
    return { warning: "Email is not verified" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
