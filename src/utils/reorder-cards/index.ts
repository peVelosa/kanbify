import { ReorderCardsSchema, type TReorderCards } from "./schema";

export const reorderCards = (props: TReorderCards) => {
  const validatedFields = ReorderCardsSchema.safeParse(props);
  if (!validatedFields.success)
    return {
      sourceColumn: props.sourceColumn,
      targetColumn: props.targetColumn,
      index: props.index,
    };

  const { draggedItem, sourceColumn, targetColumn, index } = validatedFields.data;

  const isSameColumn = sourceColumn.id === targetColumn.id;

  const newCards = sourceColumn.cards.filter((card) => card.id !== draggedItem.id);

  //same column
  if (isSameColumn) {
    //first item
    if (index === 0) {
      return {
        sourceColumn,
        targetColumn: { ...targetColumn, cards: changeOrderValue([draggedItem, ...newCards]) },
        index,
      };
    }
    //last item
    if (index === targetColumn.cards.length) {
      return {
        sourceColumn,
        targetColumn: { ...targetColumn, cards: changeOrderValue([...newCards, draggedItem]) },
        index,
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
      index,
    };
  }

  //different columns
  const newTargetCards = targetColumn.cards
    .slice(0, index)
    .concat(draggedItem, targetColumn.cards.slice(index))
    .map((card) => ({ ...card, column_id: targetColumn.id }));

  return {
    sourceColumn: { ...sourceColumn, cards: changeOrderValue(newCards) },
    targetColumn: { ...targetColumn, cards: changeOrderValue(newTargetCards) },
    index,
  };
};

const changeOrderValue = (cards: TReorderCards["sourceColumn"]["cards"]) =>
  cards?.map((card, index) => {
    return { ...card, order: index };
  });
