import React from "react";
import { useDragAndDropCard } from "@/lib/stores";
import type { RouterOutput } from "@/types/trpc";

type DraggableProps = {
  children: React.ReactNode;
  cards: RouterOutput["boards"]["cards"]["byColumnId"] | null;
  columnId: string;
};

const Draggable = ({ children, cards, columnId }: DraggableProps) => {
  const setSourceColumn = useDragAndDropCard((state) => state.setSourceColumn);
  const reset = useDragAndDropCard((state) => state.reset);

  const handleDragStart = (e: any) => {
    e.stopPropagation();

    if (!cards) return;
    setSourceColumn({ id: columnId, cards });
  };

  const handleDragEnd = () => reset();

  return (
    <div
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {children}
    </div>
  );
};

export default Draggable;
