import { type RouterOutput } from "@/types/trpc";

type Card = RouterOutput["boards"]["cards"]["byColumnId"][0];

type Column = {
  id: string;
  cards: Card[];
};

export type DragAndDropCard = {
  card: Card | null;
  sourceColumn: Column;
  index: number | null;
  setIndex: (index: number | null) => void;
  setDragItem: (card: Card | null) => void;
  setSourceColumn: (column: Column) => void;
  reset: () => void;
};
