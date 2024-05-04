"use server";

import { db } from "@/server/db";
import type { $Enums } from "@prisma/client";

export async function isAllowedTo({
  bid,
  user_id,
  desiredRole,
}: {
  bid?: string;
  user_id?: string;
  desiredRole: $Enums.ROLE[];
}) {
  if (!bid || !user_id) return { error: "Invalid data" };

  try {
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

    if (!collaborator || !desiredRole.includes(collaborator.role)) return false;

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
