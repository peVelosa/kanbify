"use server";
import { db } from "@/lib/db";

export const fetchVerification = async (vid: string) => {
  return await db.verificationRequest.findFirst({
    where: {
      id: vid,
    },
  });
};

export const fetchAlreadyVerified = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
    select: {
      emailVerified: true,
      email: true,
    },
  });
};

export const verifyEmail = async (email: string) => {
  return await db.user.update({
    where: {
      email,
    },
    data: {
      emailVerified: new Date(),
    },
  });
};
