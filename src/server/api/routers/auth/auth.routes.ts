import { publicProcedure } from "@/server/api/trpc";
import { verificationEmail } from "@/app/actions/send-emails/verification-email";
import { LoginSchema, RegisterSchema } from "./schemas";
import bcrypt from "bcryptjs";

export const authRoutes = {
  login: publicProcedure.input(LoginSchema).mutation(async ({ ctx, input }) => {
    const { email, password } = input;

    const user = await ctx.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !user?.password || !user.email) return { success: false, error: "User not found" };

    const isVerified = user?.emailVerified;
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) return { success: false, error: "Invalid credentials!" };

    if (!isVerified) return { success: false, warning: "Email is not verified" };

    return { success: true };
  }),
  register: publicProcedure.input(RegisterSchema).mutation(async ({ ctx, input }) => {
    const isDevelopment = process.env.NODE_ENV === "development";

    const { name, email, password } = input;

    const existingUser = await ctx.db.user.findUnique({
      where: {
        email,
      },
    });

    if (!!existingUser) {
      if (existingUser.emailVerified) return { error: "User already exists" };
      await verificationEmail({
        email,
        isDevelopment,
      });
      return { warning: "Verification email sent" };
    }

    try {
      const saltRounds = 10;

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      await ctx.db.user.create({
        data: {
          name,
          password: hashedPassword,
          email,
          emailVerified: isDevelopment ? new Date() : null,
        },
      });

      await verificationEmail({
        email,
        isDevelopment,
      });

      return { success: "Verification email sent" };
    } catch (err) {
      console.error(err);
      return null;
    }
  }),
};
