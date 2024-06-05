import { ReorderCardsSchema, type TReorderCards } from "./schema";

export const reorderCards = (props: TReorderCards) => {
  const validatedFields = ReorderCardsSchema.safeParse(props);
  if (!validatedFields.success) return;

  const { draggedItem, sourceColumn, targetColumn } = validatedFields.data;
  console.log({ draggedItem, sourceColumn, targetColumn });
};
