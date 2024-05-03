import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().min(1),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
