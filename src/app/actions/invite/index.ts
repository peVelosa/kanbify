"use server";

import { db } from "@/lib/db";

type generateInviteProps = {
  bid?: string | null;
  title: string;
};

export const generateInvite = async ({ bid, title }: generateInviteProps) => {
  if (!bid) return null;

  try {
    const hasInvite = await db.invite.findFirst({
      where: {
        board_id: bid,
      },
    });

    if (hasInvite) {
      await db.invite.delete({
        where: {
          board_id: bid,
        },
      });
    }

    const invite = await db.invite.create({
      data: {
        board_id: bid,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
        board_title: title,
      },
    });

    return invite.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};
