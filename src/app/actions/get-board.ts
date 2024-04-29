"use server";

import { db } from "@/server/db";

export default async function getBoard(bid: string, uid?: string) {
  try {
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

    if (!data) return null;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
