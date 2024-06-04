import { z } from "zod";

export const BoardSchemaReorder = z.object({
  order: z.number(),
});
