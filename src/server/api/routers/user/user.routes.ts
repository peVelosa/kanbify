import { privateProcedure, publicProcedure } from "@/server/api/trpc";
import { verifyRoutes } from "./verify/user.verify.routes";
import { UserSchemaUpdate } from "./schemas";

export const userRoutes = {
  me: privateProcedure.query(({ ctx }) => {
    return ctx.session.user;
  }),
  update: privateProcedure.input(UserSchemaUpdate).mutation(async ({ ctx, input }) => {
    const { name, email } = input;

    const user = await ctx.db.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        name,
        email,
      },
    });
    return user;
  }),
  resetPassword: publicProcedure.mutation(async ({ ctx }) => {}),
  verifyEmail: verifyRoutes,
};
