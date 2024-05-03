import { z } from "zod";

export const InviteSchema = z.object({
  vid: z.string(),
});

export const EmailSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
});
