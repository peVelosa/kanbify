"use server";

import { db } from "@/lib/db";

export const getUserByEmail = async (email?: string | null) => {
  if (!email) return null;

  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        emailVerified: true,
        image: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserById = async (uid?: string | null) => {
  if (!uid) return null;

  try {
    const user = await db.user.findUnique({
      where: {
        id: uid,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        emailVerified: true,
        image: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCollaboratorRole = async (
  uid?: string | null,
  bid?: string | null,
) => {
  if (!uid || !bid) return null;
  try {
    const user = await db.collaborator.findUnique({
      where: {
        Unique_Collaborator_User_Board: {
          user_id: uid,
          board_id: bid,
        },
      },
      select: {
        id: true,
        role: true,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
