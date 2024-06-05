import { useState } from "react";
import { useDragAndDropCard } from "@/lib/stores/drag-and-drop-store";
import { reorderCards } from "@/utils/reorder-cards";
import useReoderCards from "@/hooks/mutations/use-reorder-cards";

import { type RouterOutput } from "@/types/trpc";
import { type DragEvent } from "react";

type DroppableProps = {
  index: number;
  cards: RouterOutput["boards"]["cards"]["byColumnId"];
  columnId: string;
};

const Droppable = ({ index, cards, columnId }: DroppableProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { draggedItem, sourceColumn } = useDragAndDropCard((state) => ({
    draggedItem: state.card,
    sourceColumn: state.sourceColumn,
  }));

  const setTargetColumn = useDragAndDropCard((state) => state.setTargetColumn);

  const { mutate } = useReoderCards();

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsVisible(false);
    const targetColumn = { id: columnId, cards, index };
    setTargetColumn(targetColumn);
    if (!draggedItem || !sourceColumn || !targetColumn) return;

    const { targetColumn: newTargetColumn, sourceColumn: newSourceColumn } = reorderCards({
      draggedItem,
      sourceColumn,
      targetColumn,
    });

    const isSameColumn = sourceColumn.id === targetColumn.id;

    mutate({ sourceColumn: newSourceColumn, targetColumn: newTargetColumn, isSameColumn });
  };

  const handleDragEnter = () => setIsVisible(true);
  const handleDragLeave = () => setIsVisible(false);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`h-4 w-full ${isVisible ? "bg-blue-200 py-6" : ""}`}
    />
  );
};

export default Droppable;
