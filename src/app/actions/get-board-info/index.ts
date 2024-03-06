"use server";

import { db } from "@/lib/db";

type getBoardProps = { bid?: string | null };

export const getBoard = async ({ bid }: getBoardProps) => {
  if (!bid) return null;

  try {
    return await db.board.findUnique({
      where: { id: bid },
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
    return null;
  }
};
