import { z } from "zod";

export const CardByColumnIdSchema = z.object({
  col_id: z.string(),
});
