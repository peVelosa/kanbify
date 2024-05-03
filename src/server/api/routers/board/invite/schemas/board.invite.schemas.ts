import { z } from "zod";

export const GetInviteSchema = z.object({
  iid: z.string(),
});

export const AcceptInviteSchema = z.object({
  iid: z.string(),
  bid: z.string(),
});

export const GenerateInviteSchema = z.object({
  bid: z.string(),
});
