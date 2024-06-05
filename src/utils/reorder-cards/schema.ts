import { z } from "zod";
import type { RouterOutput } from "@/types/trpc";

type Card = RouterOutput["boards"]["cards"]["byColumnId"][0];

const CardSchema = z.custom<Card>((value) => value);

export const ReorderCardsSchema = z.object({
  draggedItem: CardSchema,
  sourceColumn: z.object({
    id: z.string(),
    cards: z.array(CardSchema),
  }),
  targetColumn: z.object({
    id: z.string(),
    cards: z.array(CardSchema),
    index: z.number(),
  }),
});

export type TReorderCards = z.infer<typeof ReorderCardsSchema>;
