import { useEffect, useMemo, useState, type DragEvent } from "react";
import useReoderCards from "@/hooks/mutations/use-reorder-cards";
import { useDragAndDropCard } from "@/lib/stores/drag-and-drop-store";
import { reorderCards } from "@/utils/reorder-cards";
import type { RouterOutput } from "@/types/trpc";

type DroppableProps = {
  index: number;
  cards: RouterOutput["boards"]["cards"]["byColumnId"];
  columnId: string;
};

const wait = async () => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve({});
    }, 100);
  });
};

const useDrop = ({ index, cards, columnId }: DroppableProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const { draggedItem, sourceColumn } = useDragAndDropCard((state) => ({
    draggedItem: state.card,
    sourceColumn: state.sourceColumn,
  }));

  const { mutate } = useReoderCards();

  useEffect(() => {
    wait().then(() => setIsDragging(!!draggedItem));
  }, [draggedItem]);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsVisible(false);
    const targetColumn = { id: columnId, cards };

    if (!draggedItem || !sourceColumn || !targetColumn || index === null) return;

    const { targetColumn: newTargetColumn, sourceColumn: newSourceColumn } = reorderCards({
      draggedItem,
      sourceColumn,
      targetColumn,
      index,
    });

    mutate({ sourceColumn: newSourceColumn, targetColumn: newTargetColumn });
  };

  const handleDragEnter = () => setIsVisible(true);
  const handleDragLeave = () => setIsVisible(false);

  return { handleDragEnter, handleDragLeave, handleDrop, isVisible, isDragging };
};

export default useDrop;
