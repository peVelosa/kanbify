import { z } from "zod";

export const ColumnSchemaId = z.object({
  col_id: z.string(),
});
