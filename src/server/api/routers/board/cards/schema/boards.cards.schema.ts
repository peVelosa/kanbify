import { z } from "zod";
// Create a Zod schema for the Card type
const CardSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  column_id: z.string(),
  assign_to: z
    .object({
      user: z.object({
        id: z.string(),
        name: z.string().nullable(),
        image: z.string().nullable(),
      }),
    })
    .nullable(),
});

export const CardByColumnIdSchema = z.object({
  col_id: z.string(),
});

export const ReorderCardsSchema = z.object({
  targetColumn: z.object({
    id: z.string(),
    cards: z.array(CardSchema),
  }),
  sourceColumn: z.object({
    id: z.string(),
    cards: z.array(CardSchema),
  }),
});
