import { privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { GetInviteSchema, AcceptInviteSchema, GenerateInviteSchema } from "./schemas";

export const inviteRoutes = {
  get: privateProcedure.input(GetInviteSchema).query(async ({ ctx, input }) => {
    const { iid } = input;

    try {
      const invite = await ctx.db.invite.findFirst({
        where: {
          id: iid,
        },
        select: {
          board_id: true,
          board_title: true,
        },
      });

      if (!invite) throw new TRPCError({ code: "NOT_FOUND" });
      return invite;
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  accept: privateProcedure.input(AcceptInviteSchema).mutation(async ({ ctx, input }) => {
    const { iid, bid } = input;

    try {
      const [collaborator, validInvite] = await Promise.all([
        await ctx.db.collaborator.findUnique({
          where: {
            Unique_Collaborator_User_Board: {
              board_id: bid,
              user_id: ctx.session.user.id,
            },
          },
          select: {
            id: true,
          },
        }),
        await ctx.db.invite.findUnique({
          where: {
            id: iid,
          },
          select: {
            expires: true,
          },
        }),
      ]);

      if (!validInvite || !collaborator)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Invite expired" });

      if (new Date().getTime() > validInvite.expires.getTime())
        return { success: false, message: "Invite expired" };

      if (collaborator.id) return { success: false, message: "Already a member of the board" };

      await ctx.db.collaborator.create({
        data: {
          board_id: bid,
          user_id: ctx.session.user.id,
          role: "EMPLOYEE",
        },
      });
      return { success: true, message: "You succefuly joined the board" };
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  generate: privateProcedure.input(GenerateInviteSchema).mutation(async ({ ctx, input }) => {
    const { bid } = input;

    try {
      const [_, boardTitle] = await Promise.all([
        await ctx.db.invite.deleteMany({
          where: {
            board_id: bid,
          },
        }),
        await ctx.db.board.findUnique({
          where: {
            id: bid,
          },
          select: {
            title: true,
          },
        }),
      ]);

      if (!boardTitle?.title)
        throw new TRPCError({ code: "NOT_FOUND", message: "Board not found" });

      const invite = await ctx.db.invite.create({
        data: {
          board_id: bid,
          board_title: boardTitle.title,
          expires: new Date(new Date().getTime() + 1000 * 60 * 3),
        },
      });

      return invite;
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
};
