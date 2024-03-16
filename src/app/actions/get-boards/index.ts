"use server";

import { db } from "@/lib/db";

export const getBoards = async (id?: string | null) => {
  if (!id) return null;

  try {
    return await db.board.findMany({
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
  } catch (error) {
    console.error(error);
    return null;
  }
};
