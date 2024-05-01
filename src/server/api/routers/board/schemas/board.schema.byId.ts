import { z } from "zod";

export const BoardSchemaByIdOrDelete = z.object({
  bid: z.string().uuid(),
});
