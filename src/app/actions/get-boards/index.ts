"use server";

import { db } from "@/lib/db";

export const getBoards = async (id?: string | null) => {
  if (!id) return null;

  try {
    const boardsOwned = await db.board.findMany({
      where: {
        owner_id: id,
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
    });

    const boardsCollaborated = await db.collaborator.findMany({
      where: {
        user_id: id,
        AND: {
          board: {
            NOT: {
              owner_id: id,
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
    });

    return {
      boardsOwned,
      boardsCollaborated: boardsCollaborated.map((b) => b.board),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
