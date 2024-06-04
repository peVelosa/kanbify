import { privateProcedure } from "@/server/api/trpc";
import { BoardSchemaReorder } from "./schemas";

export const cardsRoutes = {
  reorder: privateProcedure
    .input(BoardSchemaReorder)
    .query(async ({ ctx, input: { order } }) => {}),
};
