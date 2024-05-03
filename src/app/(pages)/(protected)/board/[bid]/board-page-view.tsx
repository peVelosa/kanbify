"use client";

import BoardInfo from "./_components/board/board-info";
import BoardColumn from "./_components/board/board-column";
import { type Board } from "@/types/trpc";

type BoardPageViewProps = {
  board: Board;
};

export default function BoardPageView({ board }: BoardPageViewProps) {
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
