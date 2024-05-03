import { z } from "zod";

export const UserSchemaUpdate = z.object({
  name: z.string(),
  email: z.string().email().trim().toLowerCase(),
});
