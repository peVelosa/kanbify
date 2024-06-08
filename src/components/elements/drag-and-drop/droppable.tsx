import useDrop from "./use-drop";
import { type RouterOutput } from "@/types/trpc";

type DroppableProps = {
  index: number;
  cards: RouterOutput["boards"]["cards"]["byColumnId"];
  columnId: string;
};

const Droppable = ({ index, cards, columnId }: DroppableProps) => {
  const { handleDragEnter, handleDragLeave, handleDrop, isVisible } = useDrop({
    index,
    cards,
    columnId,
  });

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
