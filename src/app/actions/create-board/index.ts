"use server";

import { db } from "@/lib/db";
import { TCreateBoardSchema } from "./type";

type newBoardProps = TCreateBoardSchema & {
  userId?: string;
};

export async function newBoard({ userId, title, description }: newBoardProps) {
  if (!userId || !title) return { error: "Invalid data" };

  try {
    await db.board.create({
      data: {
        title,
        description,
        owner: {
          connect: {
            id: userId,
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
            user_id: userId,
            role: "OWNER",
          },
        },
      },
    });
    return { success: { description: "Board Created" } };
  } catch (error) {
    console.error(error);
    return { error: "Error creating board" };
  }
}
