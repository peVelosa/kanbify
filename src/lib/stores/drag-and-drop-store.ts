import { create } from "zustand";
import type { DragAndDropCard } from "./types";

const useDragAndDropCard = create<DragAndDropCard>((set) => ({
  card: null,
  sourceColumn: {
    id: "",
    cards: [],
  },
  index: null,
  setIndex: (index) => set({ index }),
  setDragItem: (card) => set({ card }),
  setSourceColumn: (column) => set({ sourceColumn: column }),
  reset: () =>
    set({
      card: null,
      sourceColumn: {
        id: "",
        cards: [],
      },
      index: null,
    }),
}));

export { useDragAndDropCard };
