import useDrop from "./use-drop";
import { type RouterOutput } from "@/types/trpc";

type DroppableProps = {
  index: number;
  cards: RouterOutput["boards"]["cards"]["byColumnId"];
  columnId: string;
};

const Droppable = ({ index, cards, columnId }: DroppableProps) => {
  const { handleDragEnter, handleDragLeave, handleDrop, isVisible, isDragging } = useDrop({
    index,
    cards,
    columnId,
  });

  if (isDragging && !isVisible) {
    return (
      <div
        className="min-h-4 py-2"
        onDragEnter={handleDragEnter}
      >
        <div className="h-full w-full animate-pulse rounded-md bg-sky-400 p-2" />
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`min-h-4 w-full ${isVisible ? "py-2" : "user-select-none pointer-events-none"}`}
    >
      {isVisible && (
        <div
          className={`pointer-events-none my-2 w-full select-none rounded-md bg-slate-100 py-10 text-center text-sm text-gray-500`}
        >
          Drop here
        </div>
      )}
    </div>
  );
};

export default Droppable;
