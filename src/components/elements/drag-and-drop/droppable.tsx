import { useDragAndDropCard } from "@/lib/stores/drag-and-drop-store";
import { reorderCards } from "@/utils/reorder-cards";
import { type RouterOutput } from "@/types/trpc";
import { type DragEvent, useState } from "react";

type DroppableProps = {
  index: number;
  cards: RouterOutput["boards"]["cards"]["byColumnId"];
  columnId: string;
};

const Droppable = ({ index, cards, columnId }: DroppableProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { draggedItem, sourceColumns } = useDragAndDropCard((state) => ({
    draggedItem: state.card,
    sourceColumns: state.sourceColumn,
  }));

  const setTargetColumn = useDragAndDropCard((state) => state.setTargetColumn);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsVisible(false);
    const targetColumn = { id: columnId, cards, index };
    setTargetColumn(targetColumn);

    if (!draggedItem || !sourceColumns || !targetColumn) return;
    reorderCards({ draggedItem, sourceColumn: sourceColumns, targetColumn });
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
