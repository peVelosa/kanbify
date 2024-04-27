import { db } from "@/lib/db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { privateProcedure, ownerProcedure, adminProcedure } from "./procedures";
import { router } from "./trpc";
import { getUserBoards, getUserBoardsCollaborations } from "./actions";

export const appRouter = router({
  boards: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;

    if (!user?.id) return null;

    const boardsOwned = await getUserBoards({ uid: user.id });

    const boardsCollaborated = await getUserBoardsCollaborations({ uid: user.id });

    return {
      boardsOwned,
      boardsCollaborated: boardsCollaborated?.map(({ board }) => board),
    };
  }),
  board: {
    byId: privateProcedure
      .input(
        z.object({
          bid: z.string(),
        }),
      )
      .query(async ({ ctx, input: { bid } }) => {
        const { user } = ctx;

        const data = await db.board.findUnique({
          where: {
            id: bid,
            collaborators: {
              some: {
                user_id: user?.id,
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

        return data;
      }),
    create: privateProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string().nullish(),
        }),
      )
      .mutation(async ({ ctx, input: { title, description } }) => {
        const { user } = ctx;

        if (!user?.id) return { success: false, message: "Invalid data" };

        try {
          await db.board.create({
            data: {
              title,
              description,
              owner: {
                connect: {
                  id: user?.id,
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
                  user_id: user?.id,
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
          return {
            success: false,
            message: "An error occurred while creating your board",
          };
        }
      }),
    delete: ownerProcedure
      .input(
        z.object({
          bid: z.string(),
        }),
      )
      .mutation(async ({ ctx, input: { bid } }) => {
        const { user, isOwnerOrAdmin } = ctx;

        if (!user?.id) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid data" });
        if (!isOwnerOrAdmin) throw new TRPCError({ code: "UNAUTHORIZED" });

        try {
          await db.board.delete({
            where: {
              id: bid,
              owner_id: user.id,
            },
          });

          return { success: true, message: "Board Deleted" };
        } catch (error) {
          console.error(error);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error deleting board" });
        }
      }),
    update: adminProcedure
      .input(
        z.object({
          title: z.string().min(3),
          description: z.string().nullish(),
        }),
      )
      .mutation(async ({ ctx, input: { bid, title, description } }) => {
        const { user, isOwnerOrAdmin } = ctx;

        if (!bid || !user?.id)
          throw new TRPCError({ code: "BAD_REQUEST", message: "Title is required" });

        if (!isOwnerOrAdmin)
          throw new TRPCError({ code: "BAD_REQUEST", message: "Title is required" });

        if (!title) throw new TRPCError({ code: "BAD_REQUEST", message: "Title is required" });

        if (title.length < 3)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Title must be at least 3 characters long",
          });

        try {
          await db.board.update({
            where: {
              id: bid,
              AND: {
                collaborators: {
                  some: {
                    user_id: user.id,
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
  },
});

export type AppRouter = typeof appRouter;
