import { desiredRoleProcedure, privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const boardsRouters = {
  all: privateProcedure.query(async ({ ctx }) => {
    try {
      const boards = await ctx.db.collaborator.findMany({
        where: {
          user_id: ctx.session.user.id,
        },
        select: {
          board: {
            select: {
              id: true,
              title: true,
              description: true,
              _count: {
                select: {
                  collaborators: true,
                },
              },
              owner_id: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        boardsOwned: boards
          ?.filter(({ board }) => board.owner_id === ctx.session.user.id)
          .map(({ board }) => board),
        boardsCollaborated: boards
          ?.filter(({ board }) => board.owner_id !== ctx.session.user.id)
          .map(({ board }) => board),
      };
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching boards" });
    }
  }),
  byId: privateProcedure
    .input(
      z.object({
        bid: z.string(),
      }),
    )
    .query(async ({ ctx, input: { bid } }) => {
      try {
        return await ctx.db.board.findUnique({
          where: {
            id: bid,
            collaborators: {
              some: {
                user_id: ctx.session.user.id,
              },
            },
          },
          select: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            columns: {
              select: {
                id: true,
                title: true,
                _count: {
                  select: {
                    cards: true,
                  },
                },
                order: true,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching board" });
      }
    }),
  create: privateProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input: { title, description } }) => {
      try {
        await ctx.db.board.create({
          data: {
            title,
            description,
            owner: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            columns: {
              createMany: {
                data: [
                  {
                    title: "To Do",
                    order: 1,
                  },
                  {
                    title: "In Progress",
                    order: 2,
                  },
                  {
                    title: "Done",
                    order: 3,
                  },
                ],
              },
            },
            collaborators: {
              create: {
                user_id: ctx.session.user.id,
                role: "OWNER",
              },
            },
          },
        });
        return {
          success: true,
          message: "Your board has been created successfully",
        };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while creating your board",
        });
      }
    }),
  delete: desiredRoleProcedure
    .input(
      z.object({
        bid: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { bid } }) => {
      try {
        await ctx.db.board.delete({
          where: {
            id: bid,
            owner_id: ctx.session.user.id,
          },
        });

        return { success: true, message: "Board Deleted" };
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error deleting board" });
      }
    }),
  update: desiredRoleProcedure
    .input(
      z.object({
        title: z.string().min(3),
        description: z.string().nullish(),
      }),
    )
    .mutation(async ({ ctx, input: { bid, title, description } }) => {
      try {
        await ctx.db.board.update({
          where: {
            id: bid,
            AND: {
              collaborators: {
                some: {
                  user_id: ctx.session.user.id,
                  AND: {
                    role: "OWNER" || "ADMIN",
                    board_id: bid,
                  },
                },
              },
            },
          },
          data: {
            title: title.trim(),
            description: description?.trim(),
          },
        });

        return { success: true, message: "Board edited" };
      } catch (error) {
        console.error(error);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error editing board" });
      }
    }),
};
