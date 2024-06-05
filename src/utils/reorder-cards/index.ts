import { ReorderCardsSchema, type TReorderCards } from "./schema";

export const reorderCards = (props: TReorderCards) => {
  const validatedFields = ReorderCardsSchema.safeParse(props);
  if (!validatedFields.success)
    return {
      sourceColumn: props.sourceColumn,
      targetColumn: props.targetColumn,
    };

  const { draggedItem, sourceColumn, targetColumn } = validatedFields.data;

  const index = targetColumn.index;

  //same column
  if (sourceColumn.id === targetColumn.id) {
    //first item
    const newCards = sourceColumn.cards.filter((card) => card.id !== draggedItem.id);
    if (index === 0) {
      return {
        sourceColumn,
        targetColumn: { ...targetColumn, cards: changeOrderValue([draggedItem, ...newCards]) },
      };
    }
    //last item
    if (index === targetColumn.cards.length) {
      return {
        sourceColumn,
        targetColumn: { ...targetColumn, cards: changeOrderValue([...newCards, draggedItem]) },
      };
    }
    //middle item
    const left = targetColumn.cards.slice(0, index);
    const right = targetColumn.cards.slice(index);
    return {
      sourceColumn,
      targetColumn: {
        ...targetColumn,
        cards: changeOrderValue([
          ...left.filter((card) => card.id !== draggedItem.id),
          draggedItem,
          ...right.filter((card) => card.id !== draggedItem.id),
        ]),
      },
    };
  }

  //different columns
  const newSourceCards = sourceColumn.cards.filter((card) => card.id !== draggedItem.id);
  const newTargetCards = targetColumn.cards
    .slice(0, index)
    .concat(draggedItem, targetColumn.cards.slice(index))
    .map((card) => ({ ...card, column_id: targetColumn.id }));

  return {
    sourceColumn: { ...sourceColumn, cards: changeOrderValue(newSourceCards) },
    targetColumn: { ...targetColumn, cards: changeOrderValue(newTargetCards) },
  };
};

const changeOrderValue = (cards: TReorderCards["sourceColumn"]["cards"]) =>
  cards?.map((card, index) => {
    return { ...card, order: index };
  });
