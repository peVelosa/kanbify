"use client";

import BoardInfo from "./_components/board/board-info";
import BoardColumn from "./_components/board/board-column";
import { Board } from "@/types/board";

export default function BoardPageView({ board }: { board: Board }) {
  if (!board) return null;

  const info = {
    id: board.id,
    title: board.title,
    createdAt: board.createdAt,
    description: board?.description,
  };

  return (
    <>
      <BoardInfo {...info} />
      {board?.columns.map((column) => (
        <BoardColumn
          key={column.id}
          {...column}
        />
      ))}
    </>
  );
}
