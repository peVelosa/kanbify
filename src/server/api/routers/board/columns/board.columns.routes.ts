import { privateProcedure } from "@/server/api/trpc";
import { ColumnSchemaId } from "./schemas";
import { TRPCError } from "@trpc/server";
import { cardsRoutes } from "./cards/board.columns.cards.routes";

export const columnsRoutes = {
  byId: privateProcedure.input(ColumnSchemaId).query(async ({ ctx, input: { col_id } }) => {
    try {
      const cards = await ctx.db.card.findMany({
        where: {
          column_id: col_id,
        },
        select: {
          id: true,
          title: true,
          order: true,
          column_id: true,
          assign_to: {
            select: {
              user: {
                select: {
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
        orderBy: {
          order: "asc",
        },
      });

      return cards;
    } catch (e) {
      console.error(e);
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching columns" });
    }
  }),
  cards: cardsRoutes,
};
