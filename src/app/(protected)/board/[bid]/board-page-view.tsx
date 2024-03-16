"use client";

import { useBoard } from "@/hooks/use-board";
import BoardInfo from "./_components/board/board-info";
import BoardColumn from "./_components/board/board-column";

export default function BoardPageView() {
  const { data: board } = useBoard();

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
        <BoardColumn key={column.id} {...column} />
      ))}
    </>
  );
}
