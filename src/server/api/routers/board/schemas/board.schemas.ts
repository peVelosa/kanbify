import { z } from "zod";

export const BoardSchemaId = z.object({
  bid: z.string(),
});

export const BoardSchemaCreateOrUpdate = z.object({
  title: z.string(),
  description: z.string().nullish(),
});
