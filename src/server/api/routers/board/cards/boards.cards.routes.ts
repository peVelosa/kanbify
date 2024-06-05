import { privateProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { CardByColumnIdSchema } from "./schema";

export const cardsRoutes = {
  byColumnId: privateProcedure
    .input(CardByColumnIdSchema)
    .query(async ({ ctx, input: { col_id } }) => {
      try {
        return await ctx.db.card.findMany({
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
                    id: true,
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
      } catch (e) {
        console.error(e);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Error fetching cards" });
      }
    }),
};
