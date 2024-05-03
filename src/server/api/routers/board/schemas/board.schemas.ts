import { z } from "zod";

export const BoardSchemaId = z.object({
  bid: z.string(),
});

export const BoardSchemaCreateOrUpdate = z.object({
  title: z.string(),
  description: z.string().optional(),
});

export const DeleteBoardSchema = z.object({
  bid: z.string(),
  deleteMessageConfirmation: z.string(),
});

export type TBoardSchemaCreateOrUpdate = z.infer<typeof BoardSchemaCreateOrUpdate>;
