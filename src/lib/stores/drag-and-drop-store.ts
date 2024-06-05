import { create } from "zustand";
import { type RouterOutput } from "@/types/trpc";

type Card = RouterOutput["boards"]["columns"]["byId"][0];
type Column = {
  id: string | null;
  cards: Card[];
};

type DragAndDropCard = {
  card: Card | null;
  sourceColumn: Column;
  targetColumn: Column;
  setDragItem: (card: Card | null) => void;
  setSourceColumn: (column: Column) => void;
  setTargetColumn: (column: Column) => void;
};

const useDragAndDropCard = create<DragAndDropCard>((set) => ({
  card: null,
  sourceColumn: {
    id: null,
    cards: [],
  },
  targetColumn: {
    id: null,
    cards: [],
  },
  setDragItem: (card) => set({ card }),
  setSourceColumn: (column) => set({ sourceColumn: column }),
  setTargetColumn: (column) => set({ targetColumn: column }),
}));

export { useDragAndDropCard };
