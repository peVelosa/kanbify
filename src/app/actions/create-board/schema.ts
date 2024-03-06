import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});
