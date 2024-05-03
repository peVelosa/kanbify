import { privateProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { BoardSchemaId } from "./schemas";

export const adminOrOwnerProcedure = privateProcedure
  .input(BoardSchemaId)
  .use(async ({ ctx, next, input }) => {
    const { bid } = input;

    const collaboratorRole = await ctx.db.collaborator.findUnique({
      where: {
        Unique_Collaborator_User_Board: {
          board_id: bid,
          user_id: ctx.session.user.id,
        },
      },
      select: {
        role: true,
      },
    });

    const isAllowedTo = collaboratorRole?.role === "ADMIN" || collaboratorRole?.role === "OWNER";

    if (!isAllowedTo) throw new TRPCError({ code: "FORBIDDEN" });

    return next({
      ctx: {
        session: { ...ctx.session, role: collaboratorRole.role },
      },
    });
  });

export const ownerProcedure = privateProcedure
  .input(BoardSchemaId)
  .use(async ({ ctx, next, input }) => {
    const { bid } = input;

    const collaboratorRole = await ctx.db.collaborator.findUnique({
      where: {
        Unique_Collaborator_User_Board: {
          board_id: bid,
          user_id: ctx.session.user.id,
        },
      },
      select: {
        role: true,
      },
    });

    const isAllowedTo = collaboratorRole?.role === "OWNER";

    if (!isAllowedTo) throw new TRPCError({ code: "FORBIDDEN" });

    return next({
      ctx: {
        session: { ...ctx.session, role: collaboratorRole.role },
      },
    });
  });
