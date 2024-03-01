"use server";

import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
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
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
