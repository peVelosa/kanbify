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

export const getUserById = async (id?: string | null) => {
  if (!id) return null;

  try {
    const user = await db.user.findUnique({
      where: {
        id,
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
