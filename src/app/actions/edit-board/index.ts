"use server";

import { db } from "@/lib/db";
import { TEditBoardSchema } from "./type";
import { getRole } from "../get-role";

export type editBoardProps = TEditBoardSchema & {
  bid: string | null | undefined;
  user_id: string | null | undefined;
  titleChanged: boolean;
};

export async function editBoard({
  title,
  description,
  bid,
  user_id,
  titleChanged,
}: editBoardProps) {
  if (!bid || !user_id) return null;

  if (!title) return { error: "Title can't be empty" };

  if (title.length < 3)
    return { error: "Title must be at least 3 characters long" };

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
    if (titleExists && titleChanged)
      return { error: "Title already exists. Please choose another title." };

    const isAllowed = await getRole({
      bid,
      user_id,
      desiredRole: ["OWNER", "ADMIN"],
    });

    if (!isAllowed)
      return { error: "You don't have permission to edit this board" };

    await db.board.update({
      where: {
        id: bid,
        AND: {
          collaborators: {
            some: {
              user_id,
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
        description: description.trim(),
      },
    });

    return { success: { description: "Board edited" } };
  } catch (error) {
    console.error(error);
    return { error: "Error editing board" };
  }
}
