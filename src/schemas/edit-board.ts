import { z } from "zod";

export const EditBoardSchema = z.object({
  title: z.string().min(3).trim(),
  description: z.string().optional().default(""),
});
export type TEditBoardSchema = z.infer<typeof EditBoardSchema>;
