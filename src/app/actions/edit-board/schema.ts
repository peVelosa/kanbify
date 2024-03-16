import { z } from "zod";

export const EditBoardSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional().default(""),
});
