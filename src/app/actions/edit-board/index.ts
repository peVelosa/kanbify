"use server";

import { db } from "@/lib/db";
import { TEditBoardSchema } from "./type";

type editBoardProps = TEditBoardSchema & {
  bid: string | null | undefined;
  user_id: string | null | undefined;
};

export async function editBoard({
  title,
  description,
  bid,
  user_id,
}: editBoardProps) {
  if (!bid || !user_id) return null;

  if (!title) return { error: "Title can't be empty" };

  try {
    const boardsTitle = await db.user.findUnique({
      where: {
        id: user_id,
      },
      select: {
        boards: {
          select: {
            title: true,
          },
        },
      },
    });

    const titleExists = boardsTitle?.boards.some(
      (board) => board.title === title,
    );
    if (titleExists)
      return { error: "Title already exists. Please choose another title." };

    const collaborator = await db.collaborator.findUnique({
      where: {
        Unique_Collaborator_User_Board: {
          user_id: user_id,
          board_id: bid,
        },
      },
      select: {
        role: true,
      },
    });

    if (
      !collaborator ||
      (collaborator.role !== "OWNER" && collaborator.role !== "ADMIN")
    )
      return { error: "You don't have permission to edit this board" };

    await db.board.update({
      where: {
        id: bid,
        AND: {
          collaborators: {
            some: {
              user_id,
            },
          },
        },
      },
      data: {
        title,
        description,
      },
    });

    return { success: { description: "Board edited" } };
  } catch (error) {
    console.error(error);
    return { error: "Error editing board" };
  }
}
