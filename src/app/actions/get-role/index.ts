"use server";

import { db } from "@/lib/db";
import { $Enums } from "@prisma/client";

export async function getRole({
  bid,
  user_id,
  desiredRole,
}: {
  bid?: string;
  user_id?: string;
  desiredRole: $Enums.ROLE[];
}) {
  if (!bid || !user_id || desiredRole.length === 0)
    return { error: "Invalid data" };

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

    if (!collaborator || !desiredRole.includes(collaborator.role))
      return { error: "You don't have permission" };

    return { success: "Allowed" };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong!" };
  }
}
