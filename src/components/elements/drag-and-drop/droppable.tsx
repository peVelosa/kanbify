import { useState } from "react";

type DroppableProps = {
  index: number;
};

const Droppable = ({ index }: DroppableProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleDragEnter = () => setIsVisible(true);
  const handleDragLeave = () => setIsVisible(false);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        setIsVisible(false);
      }}
      className={`h-4 w-full ${isVisible ? "bg-blue-200 py-6" : ""}`}
    />
  );
};

export default Droppable;
