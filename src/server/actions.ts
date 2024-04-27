"use server";

import { db } from "@/lib/db";

export const getUserBoards = async ({ uid }: { uid: string }) => {
  try {
    return await db.board.findMany({
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
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getUserBoardsCollaborations = async ({ uid }: { uid: string }) => {
  try {
    return await db.collaborator.findMany({
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
  } catch (e) {
    console.error(e);
    return null;
  }
};
