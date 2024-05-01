import { z } from "zod";

export const BoardSchemaCreateOrUpdate = z.object({
  title: z.string(),
  description: z.string().nullish(),
});

export type TBoardSchemaCreateOrUpdate = z.infer<typeof BoardSchemaCreateOrUpdate>;
