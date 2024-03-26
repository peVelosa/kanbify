"use server";

import { db } from "@/lib/db";
import { getRole } from "../get-role";

export async function deleteBoard({
  bid,
  user_id,
}: {
  bid?: string;
  user_id?: string;
}) {
  if (!bid || !user_id) return { error: "Invalid data" };

  try {
    const isAllowed = await getRole({ bid, user_id, desiredRole: ["OWNER"] });

    if (!isAllowed)
      return { error: "You don't have permission to delete this board" };

    await db.board.delete({
      where: {
        id: bid,
      },
    });
    return { success: "Board Deleted" };
  } catch (error) {
    console.error(error);
    return { error: "Error deleting board" };
  }
}
