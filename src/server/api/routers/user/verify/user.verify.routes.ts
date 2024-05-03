import { publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { InviteSchema, EmailSchema } from "./schemas";

export const verifyRoutes = {
  invite: publicProcedure.input(InviteSchema).query(async ({ ctx, input }) => {
    const { vid } = input;

    try {
      return await ctx.db.verificationRequest.findFirst({
        where: {
          id: vid,
        },
      });
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  user: publicProcedure.input(EmailSchema).query(async ({ ctx, input }) => {
    const { email } = input;

    try {
      const user = await ctx.db.user.findUnique({
        where: {
          email,
        },
        select: {
          emailVerified: true,
          email: true,
        },
      });

      return { verified: user?.emailVerified, email: user?.email ?? "" };
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  verify: publicProcedure.input(EmailSchema).mutation(async ({ ctx, input }) => {
    const { email } = input;

    try {
      return await ctx.db.user.update({
        where: {
          email,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
};
