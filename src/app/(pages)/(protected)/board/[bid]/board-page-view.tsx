"use client";

import BoardInfo from "./_components/board/board-info";
import BoardColumnsWrapper from "./_components/board/board-columns-wrapper";
import { type Board } from "@/types/trpc";
import BoardColumn from "./_components/board/board-column";

type BoardPageViewProps = {
  board: NonNullable<Board>;
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
      <BoardColumnsWrapper>
        {board?.columns.map((column) => (
          <BoardColumn
            key={column.id}
            {...column}
          />
        ))}
      </BoardColumnsWrapper>
    </>
  );
}
