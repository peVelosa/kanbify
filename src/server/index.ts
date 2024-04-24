import { db } from "@/lib/db";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  getBoards: publicProcedure
    .input(
      z.object({
        uid: z.string().nullish(),
      }),
    )
    .query(async ({ input: { uid } }) => {
      if (!uid) return null;

      const boardsOwned = await db.board.findMany({
        where: {
          owner_id: uid,
        },
        select: {
          id: true,
          title: true,
          description: true,
          _count: {
            select: {
              collaborators: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const boardsCollaborated = await db.collaborator.findMany({
        where: {
          user_id: uid,
          AND: {
            board: {
              NOT: {
                owner_id: uid,
              },
            },
          },
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
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        boardsOwned,
        boardsCollaborated: boardsCollaborated.map(({ board }) => board),
      };
    }),
  getBoard: publicProcedure
    .input(
      z.object({
        uid: z.string().nullish(),
        bid: z.string(),
      }),
    )
    .query(async ({ input: { bid, uid } }) => {
      if (!uid) return null;

      const data = await db.board.findUnique({
        where: {
          id: bid,
          collaborators: {
            some: {
              user_id: uid,
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
  createBoard: publicProcedure
    .input(
      z.object({
        uid: z.string(),
        title: z.string(),
        description: z.string().nullish(),
      }),
    )
    .mutation(async ({ input: { uid, title, description } }) => {
      try {
        await db.board.create({
          data: {
            title,
            description,
            owner: {
              connect: {
                id: uid,
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
                user_id: uid,
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
  deleteBoard: publicProcedure
    .input(
      z.object({
        uid: z.string().nullish(),
        bid: z.string(),
      }),
    )
    .mutation(async ({ input: { uid, bid } }) => {
      if (!uid) return { success: false, message: "Invalid data" };
      try {
        await db.board.delete({
          where: {
            id: bid,
            owner_id: uid,
          },
        });

        return { success: true, message: "Board Deleted" };
      } catch (error) {
        console.error(error);
        return { success: false, message: "Error deleting board" };
      }
    }),
  updateBoard: publicProcedure
    .input(
      z.object({
        uid: z.string(),
        bid: z.string(),
        title: z.string().min(3),
        description: z.string().nullish(),
      }),
    )
    .mutation(async ({ input: { uid, bid, title, description } }) => {
      if (!bid || !uid) return { success: false, message: "Invalid request" };

      if (!title) return { success: false, message: "Title can't be empty" };

      if (title.length < 3)
        return {
          success: false,
          message: "Title must be at least 3 characters long",
        };

      try {
        await db.board.update({
          where: {
            id: bid,
            AND: {
              collaborators: {
                some: {
                  user_id: uid,
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
        return { success: false, message: "Error editing board" };
      }
    }),
});

export type AppRouter = typeof appRouter;
