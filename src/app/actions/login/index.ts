import { signIn as AuthSignIn } from "next-auth/react";
import { AuthError } from "next-auth";
import { type TLoginSchema } from "@/server/api/routers/auth/schemas/auth.schema.login";

export const signIn = async (values: TLoginSchema) => {
  try {
    await AuthSignIn("credentials", {
      email: values.email,
      password: values.password,
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
