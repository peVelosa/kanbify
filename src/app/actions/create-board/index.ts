"use server";

import { db } from "@/lib/db";
import { TCreateBoardSchema } from "./type";

type newBoardProps = TCreateBoardSchema & {
  userId?: string;
};

export async function newBoard({ userId, title, description }: newBoardProps) {
  console.log(userId, title, description)
  if (!userId || !title) return { error: "Invalid data" };
  console.log('aqui dentro')
  try {
    await db.board.create({
      data: {
        title,
        description,
        user: {
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
      },
    });
    return { success: { description: "Board Created" } };
  } catch (error) {
    console.error(error);
    return { error: "Error creating board" };
  }
}
