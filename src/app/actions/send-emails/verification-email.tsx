"use server";

import VerificationLink from "@/emails/verification-link";
import send from "@/actions/send-emails";
import { db } from "@/server/db";
import * as z from "zod";

type verificationEmailProps = {
  email: string;
  isDevelopment: boolean;
};

const EmailSchema = z.object({
  email: z.string().email().toLowerCase(),
});

export const verificationEmail = async ({ email, isDevelopment }: verificationEmailProps) => {
  const validatedFields = EmailSchema.safeParse({
    email,
  });

  if (!validatedFields.success) return null;

  const { email: validEmail } = validatedFields.data;

  const existingVerification = await db.verificationRequest.findFirst({
    where: {
      identifier: validEmail,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (
    existingVerification &&
    new Date(existingVerification.createdAt.getTime() + 1000 * 60).getTime() > new Date().getTime()
  ) {
    return new Date(existingVerification.createdAt.getTime() + 1000 * 60);
  }

  await db.verificationRequest.deleteMany({
    where: {
      identifier: email,
    },
  });

  const verification = await db.verificationRequest.create({
    data: {
      identifier: validEmail,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3), //3 hours
      token: Math.random().toString(36).substring(2),
    },
  });

  if (!verification) return null;

  if (isDevelopment) return new Date(verification.createdAt.getTime() + 1000 * 60);

  await send({
    subject: "Verification link",
    to: validEmail,
    component: VerificationLink({
      verificationTokenId: verification.id,
      expiresAt: verification.expires,
    }),
  });

  return new Date(verification.createdAt.getTime() + 1000 * 60);
};
