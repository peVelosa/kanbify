import React from "react";
import { useDragAndDropCard } from "@/lib/stores/drag-and-drop-store";
import type { RouterOutput } from "@/types/trpc";

type DraggableProps = {
  children: React.ReactNode;
  cards: RouterOutput["boards"]["cards"]["byColumnId"] | null;
  columnId: string;
};

const Draggable = ({ children, cards, columnId }: DraggableProps) => {
  const setSourceColumn = useDragAndDropCard((state) => state.setSourceColumn);

  const handleDragStart = () => {
    if (!cards) return;
    setSourceColumn({ id: columnId, cards });
  };

  return <div onDragStart={handleDragStart}>{children}</div>;
};

export default Draggable;
