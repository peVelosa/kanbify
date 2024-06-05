import { create } from "zustand";
import { type RouterOutput } from "@/types/trpc";

type Card = RouterOutput["boards"]["cards"]["byColumnId"][0];
type Column = {
  id: string;
  cards: Card[];
};

type DragAndDropCard = {
  card: Card | null;
  sourceColumn: Column;
  targetColumn: Column & { index: number };
  setDragItem: (card: Card | null) => void;
  setSourceColumn: (column: Column) => void;
  setTargetColumn: (column: Column & { index: number }) => void;
};

const useDragAndDropCard = create<DragAndDropCard>((set) => ({
  card: null,
  sourceColumn: {
    id: "",
    cards: [],
  },
  targetColumn: {
    id: "",
    cards: [],
    index: 0,
  },
  setDragItem: (card) => set({ card }),
  setSourceColumn: (column) => set({ sourceColumn: column }),
  setTargetColumn: ({ id, cards, index }) => set({ targetColumn: { id, cards, index } }),
}));

export { useDragAndDropCard };
