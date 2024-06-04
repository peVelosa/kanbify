import { useDrop } from "react-dnd";

type DroppableProps = {
  children: React.ReactNode;
};

const Droppable = ({ children }: DroppableProps) => {
  const [{ isOver }, ref] = useDrop(
    () => ({
      accept: "CARD",
      drop: (e) => console.log(e),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  return <div ref={ref}>{children}</div>;
};

export default Droppable;
