"use server";

import { db } from "@/lib/db";

type acceptInviteProps = {
  bid?: string | null;
  uid?: string | null;
};

export const acceptInvite = async ({ bid, uid }: acceptInviteProps) => {
  if (!bid || !uid) return null;

  try {
    const alreadyMember = await db.collaborator.findUnique({
      where: {
        Unique_Collaborator_User_Board: {
          user_id: uid,
          board_id: bid,
        },
      },
    });

    if (alreadyMember) {
      return { error: "You are already a member of this board" };
    }

    await db.collaborator.create({
      data: {
        board_id: bid,
        user_id: uid,
        role: "EMPLOYEE",
      },
    });

    return { success: "You have successfully joined the board" };
  } catch (e) {
    console.error(e);
    return null;
  }
};
