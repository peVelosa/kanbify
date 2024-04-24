import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
});
export type TCreateBoardSchema = z.infer<typeof CreateBoardSchema>;
